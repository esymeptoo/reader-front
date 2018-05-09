import { Action } from 'redux';

export function action(type: string, payload: object = {}): Action {
    return {
        ...payload, type
    }
}

export function flowAction(requestAction, requestSuccess, requestFail) {
    return {
        request: () => action(requestAction, {}),
        success: response => action(requestSuccess, { response }),
        fail: error => action(requestFail, { error })
    }
}