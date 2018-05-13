import { Action } from 'redux';
import _ from 'lodash';

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


/*fullFlowAction的目的是为了在各自action定制参数
* 可以与接口或者权限相关
* */
export function fullFlowAction(mapArg) {
    return function (requestAction, requestSuccess, requestFail) {
        return {
            request: (args = [], params) => action(requestAction, {params, ...parseArg(mapArg, args)}),
            success: (response, args = [], params) => action(requestSuccess, { response, params, ...parseArg(mapArg, args)}),
            fail: (error, args = [], params) => action(requestFail, { error, ...args })
        }
    }
}


function parseArg(mapArg, args) {
    let ret = {};
    if (!mapArg) {
        return ret;
    } else if (typeof mapArg === 'function') {
        ret = mapArg.call(null, ...args)
    } else if (Array.isArray(mapArg)) {
       ret = _.zipObject(mapArg, args)
    } else {
        throw new Error('mapArg is not valid')
    }
    return ret;
}