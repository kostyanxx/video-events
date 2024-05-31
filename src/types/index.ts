import { Action } from "redux";

import { FETCH_DATA_SUCCESS, FETCH_DATA_REQUEST } from '../constants';

export interface TimestampType {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface PostType {
    timestamp: number;
    duration: number;
    zone: TimestampType;
}

export interface FetchSuccessResponseInterface extends Array<PostType> {
}

export interface FetchSuccessActionInterface extends Action<typeof FETCH_DATA_SUCCESS> {
    type: typeof FETCH_DATA_SUCCESS;
    payload: FetchSuccessResponseInterface;
}

export interface FetchRequestActionInterface extends Action<typeof FETCH_DATA_REQUEST> {
    type: typeof FETCH_DATA_REQUEST;
  }