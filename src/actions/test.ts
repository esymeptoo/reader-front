import { Action } from 'redux';
import { action, flowAction } from './index';
import { Test } from 'constants/actionTypes'

//测试请求 非异步
export type TestChangeCreator = () => Action;
export const testChange = () => action(Test.testChange, {});

//异步操作
export type RequestNovelActionCreator = () => Action;
export const requestNovelAction = () => action(Test.requestNovelAction, {});

//接口action封装
export const flowRequestNovel = flowAction(
    Test.requestNovel,
    Test.requestNovelSuccess,
    Test.requestNovelFail
);