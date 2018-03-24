import SC from 'soundcloud';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux'
import {combineForms, createForms} from 'react-redux-form';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';


SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
	    <Router history={history}>
	        <div>
	            <Route path="/" component={App}/>
	        </div>
	    </Router>
    </Provider>,
    document.getElementById('root')
);
