import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ParseSportingEvents, ParseEventsByTeam} from '../actions/index';

class SportingEvents extends Component{
	constructor(props){
		super(props);
		
		if(this.props.team_events === []){
			this.props.ParseSportingEvents(props.curr_date, props.eventForecast);
		}

		this.state = {
			team: null
		}
	}
	componentDidMount(){
		console.log("PropsAfterwards: ", this.props.team_events);
	}
	render(){
		console.log("Props: ", this.props.team_events);
		const teams = '<span className = "TeamName" onClick = (){if (this.state.team !== team.name){this.props.ParseEventsByTeam(team.name).then(function(){this.setState({team: team.name})})}else{return;}}>'
	
		return(
			<div className = "Sporting_Events">
			    <header className='SportingEventsTitle'>
			         Sporting Events
			    </header>
	            {this.props.team_events.map((event) => {
					<div className='EventBlock'>
					   <span className = 'EventTitle'>
						{JSON.parse(event["title"])}
					   </span>
					   <span>
					   	{JSON.parse(event["performers"]).map((performer) => {
						     return (<span className="performerNames">
								   		{JSON.parse(performer["name"])}
								   		<br />
								   	 </span>)
					   	})}
					   </span>
					   <span className = 'EventName'>			
						 {JSON.parse(event["venue"]["name"])}
					   </span>		    
					  <span className = 'EventHappenstance'>
						{JSON.parse(event["venue"]["address"]), JSON.parse(event["venue"]["extended_address"])}
					  </span>
				    </div>
		  		})}
		    </div>
		)
	}
}	

function mapStateToProps(state){
	return {
		team_events: state.eventOptions.team_events
	}
}	

export default connect(mapStateToProps, {ParseSportingEvents, ParseEventsByTeam})(SportingEvents);