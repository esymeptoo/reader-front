'use strict';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'


import createSagaMiddleware from 'redux-saga';
import saga from '../sagas'


export default function configureStore(initialState?: object) {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            sagaMiddleware
        )
    );
    sagaMiddleware.run(saga);
    return store;
}

