import { takeEvery, delay } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';
import { Test } from 'constants/actionTypes';
import { action } from 'actions/index'
import { flowRequestNovel } from 'actions/test';
import { dealFlowAction } from '../utils/common';
import Api from '../api';

function* justTest() {
    yield takeEvery(Test.testChange, function* () {
        yield put(action(Test.testChangeSuccess))
    })
}

function* fetchNovel() {
    yield takeEvery(Test.requestNovelAction, function* () {
        yield dealFlowAction(
            Api.testApi,
            flowRequestNovel
        )
    })
}

export default function* test() {
    yield* [
        fork(justTest),
        fork(fetchNovel)
    ]
}