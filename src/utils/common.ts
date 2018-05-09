import { call, put } from 'redux-saga/effects';

/*
* deal with flow Action
* request/success/fail
* @params {function} request func
* @params {object} flow actions
* @params {Array} request params
* @returns {object}
* */
export function* dealFlowAction(apiFn, actions, ...args) {
    if(!apiFn) return;
    const { request, success, fail } = actions;
    yield put(request(...args));
    try {
        const res = yield call(apiFn, ...args);
        yield put(success(res));
        return { res };
    } catch(e) {
        yield put(fail(e));
        return { error: e };
    }
}