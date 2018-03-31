import React, { Component } from 'react';
import PlaylistSearchBar from './PlaylistSearchBar';
import PossibleMatches from './PossibleMatches';
import EventTicketsSearchBar from './EventTicketsSearchBar';
import Intro from './Intro';
// import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';


class App extends React.Component{
   render(){
   		return (
		    <div>
				<Intro/>
				<PlaylistSearchBar/>
			    <PossibleMatches/>
				<EventTicketsSearchBar/>
		    </div>
		)
   };
}

export default App;
