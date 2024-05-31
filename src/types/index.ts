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

export interface FetchPostsSuccessResponseInterface extends Array<PostType> {
}

export interface FetchPostsSuccessActionInterface extends Action<typeof FETCH_DATA_SUCCESS> {
    type: typeof FETCH_DATA_SUCCESS;
    payload: FetchPostsSuccessResponseInterface;
}

export interface FetchPostsRequestActionInterface extends Action<typeof FETCH_DATA_REQUEST> {
    type: typeof FETCH_DATA_REQUEST;
  }