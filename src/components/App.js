import React, { Component } from 'react';
import PlaylistSearchBar from './PlaylistSearchBar';
import PossibleMatches from './PossibleMatches';
import EventTicketsSearchBar from './EventTicketsSearchBar';
import EventTickets from './EventTickets';
import Intro from './Intro';

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
				<EventTickets/>
		    </div>
		)
   };
}


export default App;
