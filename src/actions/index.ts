import {
    FetchPostsSuccessResponseInterface,
    FetchPostsRequestActionInterface,
    FetchPostsSuccessActionInterface
} from "../types";
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from '../constants'

export const fetchDataRequest = (): FetchPostsRequestActionInterface => ({
    type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: FetchPostsSuccessResponseInterface): FetchPostsSuccessActionInterface => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export type PostsActions =
  | FetchPostsRequestActionInterface
  | FetchPostsSuccessActionInterface
;