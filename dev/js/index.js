import SC from 'soundcloud';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux'
import {combineForms, createForms} from 'react-redux-form';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {browserHistory} from 'react-router';
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

let history = syncHistoryWithStore(createBrowserHistory(), store);


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
