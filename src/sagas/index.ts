import {call, put, takeEvery} from "redux-saga/effects";
import * as actions from "../actions";
import { FetchPostsSuccessResponseInterface } from "../types";
import { FETCH_DATA_REQUEST } from '../constants'

const getEventList = async () => {
    const response = await fetch("https://run.mocky.io/v3/86ba5ad4-c45e-4f3d-9a07-83ce9a345833");
    return await response.json();
}

function* fetchData(): Generator {
    const data =(yield call(getEventList)) as FetchPostsSuccessResponseInterface;
    yield put(actions.fetchDataSuccess(data));
}

export function* watchFetchData() {
    yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}
