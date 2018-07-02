import React, { Component } from 'react';
import PlaylistSearchBar from './PlaylistSearchBar';
import PossibleMatches from './PossibleMatches';
import EventTickets from './EventTickets';
import Intro from './Intro';


class App extends Component{
   constructor(props){
   	 super(props);

   	 this.state = {
   	 	greeting: "Wassup"
   	 }

       this.setOfMatches = React.createRef();
   }

   render(){
      

   	return (
		    <div>
		    	<h1>{this.state.greeting}</h1>
			   <Intro/>
				<PlaylistSearchBar/>
	        	<PossibleMatches ref={this.setOfMatches} />
				<EventTickets/>
		    </div> 
		)
   };
}



export default App;
