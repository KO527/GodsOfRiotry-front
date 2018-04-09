import React, { Component } from 'react';
import PlaylistSearchBar from './PlaylistSearchBar';
import PossibleMatches from './PossibleMatches';
import EventTicketsSearchBar from './EventTicketsSearchBar';
import Intro from './Intro';
// import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';


class App extends Component{
   constructor(){
   	 super();
   	 this.state = {
   	 	greeting: "Wassup"
   	 }
   }
   render(){
   		return (
		    <div>
		    	<h1>{this.state.greeting}</h1>
			   <Intro/>
				<PlaylistSearchBar/>
	        	<PossibleMatches/>
				<EventTicketsSearchBar/>
		    </div>
		)
   };
}

export default App;
