import React, { Component } from 'react';
import PlaylistSearchBar from './PlaylistSearchBar';
import PossibleMatches from './PossibleMatches';
import EventTickets from './EventTickets';
import Login from './Login';
import Home from './Home';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import GenderForm from './GenderForm';
import soundCloudExp from './SCsearch';
import PrivateRoute from './PrivateRoute';
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import alertActions from '../actions/alert.actions';
import { connect } from 'react-redux';

export const history = createBrowserHistory();

class App extends Component{
   constructor(){
   	 super();

       history.listen((location, action, dispatch) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
   }

   // const auth = new Auth();

   // const handleAuthentication = (nextState, replace) => {
   //   if (/access_token|id_token|error/.test(nextState.location.hash)) {
   //     auth.handleAuthentication();
   //   }
   // }

   render(){
      const {loggedIn} = this.props;

   	return (
         <Router history={history}>
    		    <div>
                <Route path = '/SoundCloud' component={soundCloudExp}/>
    	        	{/*
                <PrivateRoute exact path='/' component={Home}/>
                <Route path = '/PossibleMatches' component = {PossibleMatches}/>
    				    <Route path = '/EventTickets' component = {EventTickets}/>
                <Route path = '/Login' component = {Login}/>
                <Route path = '/Home' component render={(props) => {
                                                       handleAuthentication(props);
                                                       return <Home {...props} />}}/>
                <Route path = '/ContactInfo' component = {ContactInfo}/>
                <Route path = '/BasicInfo' component = {BasicInfo}/>
                <Route path = '/GenderForm' component = {GenderForm}/>*/}
    		    </div>
         </Router>

		)
   };
}

function mapStateToProps(state){
   return {loggedIn: state.authentication.loggedIn}
}

export default connect(mapStateToProps, null)(App);
