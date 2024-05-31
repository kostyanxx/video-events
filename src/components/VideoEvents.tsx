import {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../actions";
import { PostType } from "../types";

export interface RootState {
    data: [];
}

const VideoEvents = () => {
    const videoElement = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const [max, setMax] = useState(10);
    const [current, setCurrent] = useState(0);
    const [play, setPlay] = useState(false);
    const [objects, setObjects] = useState<{timestamp: number, top: number, left: number, width: number, height: number}[]>([]);
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [timeLabel, setTimeLabel] = useState<string>('00:00:000');
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.data);

    const getDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], {
            hour: '2-digit', minute:'2-digit', second: '2-digit'
        }) + `:${date.getMilliseconds().toString().padStart(3, "0")}`;
    };

    const drawDetection = (timeout: number, top: number, left: number, width: number, height: number, timestamp: number) => {
        const object = {timestamp: timestamp, top, left, width, height};
        setObjects(current => [...current, object]);
        setTimeout(() => {
            setObjects(current => [...current.filter((objectA) => objectA.timestamp !== object.timestamp)]);
        }, timeout);
    }

    const render = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const timerId = setInterval(() => {
                if (!ctx || !videoElement.current) return;
                ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height);
                ctx.stroke();
                if (videoElement.current) {
                   const currentTime = videoElement.current.currentTime;
                   const minutes = Math.floor(currentTime / 60);
                   const seconds = Math.floor(currentTime - minutes * 60);
                   const milliseconds = Math.floor((currentTime - Math.trunc(currentTime)) * 1000);
                   const minuteValue = minutes.toString().padStart(2, "0");
                   const secondValue = seconds.toString().padStart(2, "0");
                   const millisecondsValue = milliseconds.toString().padStart(3, "0");
                   const mediaTime = `${minuteValue}:${secondValue}:${millisecondsValue}`;
                   setTimeLabel(mediaTime);
                   setCurrent(seconds);
                   setProgress(videoElement.current.currentTime);
                }
            }, 10);
            setTimerId(timerId);
        }
        return null;
    }

    useEffect(() => {
        dispatch(fetchDataRequest() as any);
    }, [dispatch]);

    useEffect(() => {
        if (!videoElement.current) return;
        if (play) {
            videoElement.current.play();
            render();
        } else {
            videoElement.current.pause();
            clearInterval(timerId);
        }
        if (videoElement.current.duration) {
            setMax(videoElement.current.duration);
        }
    }, [play]);

    useEffect(() => {
        if (!objects) return;
        const canvas = canvasRef.current;
        if (canvas) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx || !videoElement.current) return;
            ctx.reset();
            ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height);
            objects.forEach((object) => {
                ctx.rect(object.top, object.left, object.width, object.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#0d5b0d';
                ctx.stroke();
            });
        }
    }, [objects]);

    useEffect(() => {
        if (videoElement.current) {
            const currentTime = videoElement.current.currentTime;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime - minutes * 60);
            const filteredEvents = data && data.filter((event: PostType) => {
                const date = new Date(event.timestamp * 1000);
                if (date.getMinutes() === minutes && date.getSeconds() === seconds) {
                    return true;
                }
                return false;
            });

            if (!filteredEvents || filteredEvents.length === 0) return;

            filteredEvents && filteredEvents.forEach((event: PostType) => {
                drawDetection(event.duration * 1000, event.zone.top, event.zone.left, event.zone.width, event.zone.height, event.timestamp);
            });
        }
    }, [current]);

    return (
        <div style={{display: 'flex'}}>
            <div>
                <video ref={videoElement} width="1280" height="720"
                       src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                       style={{display: 'none'}}/>
                <div>
                    <div onClick={() => setPlay(!play)}>
                        <canvas ref={canvasRef} width="1280" height="720" style={{background: 'grey'}}/>
                    </div>
                    <div>
                        <div>{timeLabel}</div>
                        <progress max={max} value={progress} style={{width: 1280}} onClick={(e: React.MouseEvent<HTMLElement>) => {
                            if (videoElement.current) {
                                setProgress((e.nativeEvent.offsetX / 1280) * 10);
                                setObjects([]);
                                videoElement.current.currentTime = (e.nativeEvent.offsetX / 1280) * videoElement.current.duration;
                            }
                        }}/>
                    </div>
                </div>
            </div>
            <div style={{height: 720, overflowX: 'scroll', marginLeft: 10}}>
                {data && data.sort((a: PostType, b: PostType) => a.timestamp - b.timestamp).map((eventData: PostType, i: number) => (
                    <div key={i}>
                        <div style={{padding: 5, cursor: 'pointer', border: 'solid 1px #a2a2a2', color: 'grey', marginTop: 3}} onClick={() => {
                            if (videoElement.current) {
                                const date = new Date(eventData.timestamp * 1000);
                                const seconds = Math.floor((date.getMinutes() * 60) + date.getSeconds());
                                setObjects([]);
                                videoElement.current.currentTime = seconds;
                                setPlay(true);
                            }
                        }}>
                            {getDate(eventData.timestamp)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoEvents;
