import React, { Component } from 'react';


class SportingEvents extends React.Component{
	constructor(){
		super(props);
		
		if(this.props.team_events == null){
			this.props.ParseSportingEvents();
		}

		this.state = {
			team: null
		}
	}
	render(){

		const teams = '<span className = "TeamName" onClick = (){if (this.state.team !== team.name){this.props.ParseEventsByTeam(team.name).then(function(){this.setState({team: team.name})})}else{return;}}>'
	
		return(
			<div className = "Sporting_Events">
			    <header className='SportingEventsTitle'>
			         Sporting Events
			    </header>
	            {this.props.team_events.map((event) => {
					<div className='EventBlock'>
					   <span className = 'EventTitle'>
						JSON.parse(event["title"])
					   </span>
					   <span>			
						 event
					   </span>		    
					  <span className = 'EventHappenstance'>
						event.happening
					  </span>
					  <span>
						event.venue
					  </span>
				    </div>
		  		})}
		    </div>
		)
	}
}	

function mapStateToProps(state){
	return {
		team_events: state.team_events
	}
}	

export default connect(mapStateToProps, {ParseSportingEvents})(SportingEvents);