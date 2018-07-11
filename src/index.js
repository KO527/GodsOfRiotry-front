import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import allReducers from './reducers';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import {syncHistoryWithStore} from 'react-router-redux';
import createLogger from 'redux-logger';

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
                    <Route path="/" store={store} component={App}/>
                </div>
              </Router>
      </Provider>, document.getElementById('root'));
registerServiceWorker();

export default store;