import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ParseSportingEvents, ParseEventsByTeam} from '../actions/index';
import EventListing from '../EventListing';

class SportingEvents extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			team: null
		}
	}
	
	componentDidMount(){
		const { team_events, currDate, eventForecast, ParseSportingEvents } = this.props;
		
		if(team_events.length === 0){
			ParseSportingEvents(currDate(), eventForecast());
		}
	}

	shouldComponentUpdate(nextState){

		const { team_events, currDate, eventForecast, ParseEventsByTeam } = this.props;
		const { team } = this.state;
		
		if (team_events.length === 0 || team !== nextState.team){
			ParseEventsByTeam(team, currDate(), eventForecast());
		}
		
	}

	// console.log(toStandardTime('16:30:00'));

	render(){
		
		const { team_events, specific_team_events, ParseEventsByTeam, ParseSportingEvents } = this.props;
		const { team } = this.state;
		const teams = '<span className = "TeamName" onClick = (){if (this.state.team !== team.name){this.props.ParseEventsByTeam(team.name).then(function(){this.setState({team: team.name})})}else{return;}}>'
	
		return(
			<div className = "Sporting_Events">
			    <header className='SportingEventsTitle'>
			         Sporting Events
			    </header>
	            {team_events.map((event) => {
		            		return (
								<div className='EventBlock'>
								   <span className = 'EventTitle'>
									{event.title}
								   </span>
								   	{specific_team_events ? 
						   				specific_team_events.forEach((event) => {
							   				<EventListing 
            									type_of_events={specific_team_events}
            									methodOfChoice={ParseEventsByTeam}
            								/>
										}) : specific_team_events.forEach((specific_event) => {
								   				<EventListing 
                    									type_of_events={team_events}
                    									methodOfChoice={ParseEventsByTeam}
      											/>
								   			})
									}
					    		</div>
					    	)
		  		})}
		    </div>
		)
	}
}	

function mapStateToProps(state){
	return {
		team_events: state.eventOptions.team_events,
		specific_team_events: state.eventOptions.specific_team_events
	}
}	

export default connect(mapStateToProps, {ParseSportingEvents, ParseEventsByTeam})(SportingEvents);