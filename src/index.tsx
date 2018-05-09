import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
// import createHistory from 'history/createHashHistory';
import App from './containers/App/App';
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();
// const history = createHistory();

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
