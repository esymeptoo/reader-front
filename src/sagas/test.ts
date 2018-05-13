import { takeEvery, delay } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';
import { Test } from 'constants/actionTypes';
import { action } from 'actions/index'
import { flowRequestNovel, fullFlowRequestNovel } from 'actions/test';
import { dealFlowAction } from '../utils/common';
import Api from '../api';

function* justTest() {
    yield takeEvery(Test.testChange, function* () {
        yield put(action(Test.testChangeSuccess))
    })
}


/*
* 一下函数为例 有些值可以从store中获取 可以引入select from 'redux-saga/effect'
* 然后通过dealFlowAction注入api
* */
function* fetchNovel() {
    yield takeEvery(Test.requestNovelAction, function* (obj = {}) {
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