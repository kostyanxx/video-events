import {
    FetchSuccessResponseInterface,
    FetchRequestActionInterface,
    FetchSuccessActionInterface
} from "../types";
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from '../constants'

export const fetchDataRequest = (): FetchRequestActionInterface => ({
    type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: FetchSuccessResponseInterface): FetchSuccessActionInterface => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export type PostsActions =
  | FetchRequestActionInterface
  | FetchSuccessActionInterface
;