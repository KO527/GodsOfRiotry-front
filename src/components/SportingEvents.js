import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ParseSportingEvents, ParseEventsByTeam} from '../actions/index';
import EventListing from './EventListing';

class SportingEvents extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			selectedPerformer: null
		}

		this.checkTypeOfEvent = this.checkTypeOfEvent.bind(this);
	}
	
	componentDidMount(){
		const { team_events, currDate, eventForecast, ParseSportingEvents } = this.props;
		
		if(team_events.length === 0){
			ParseSportingEvents(currDate(), eventForecast());
		}
	}

	shouldComponentUpdate(nextState){

		const { team_events, currDate, eventForecast, ParseEventsByTeam } = this.props;
		const { selectedPerformer } = this.state;
		
		if (selectedPerformer !== nextState.selectedPerformer && selectedPerformer !== null){
			ParseEventsByTeam(selectedPerformer, currDate(), eventForecast());
			return true;
		}

		return false;
		
	}

	checkTypeOfEvent(performer, type_of_events){
		let kind_of_events = type_of_events;
		if (kind_of_events === 'artist_events'){
			this.setState({artist: performer.name});
		} else if (kind_of_events === 'team_events' || kind_of_events === 'specific_team_events'){
			this.setState({team: performer.name});
		}
	}

	render(){
		
		const { team_events, specific_team_events, ParseEventsByTeam, ParseSportingEvents } = this.props;
		const { selectedPerformer } = this.state;
	
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
						   				specific_team_events.forEach((specific_event) => {
							   				<EventListing 
            									type_of_events={specific_team_events}
            									methodOfChoice={ParseEventsByTeam}
            									currentEvent={specific_event}
            									checkTypeOfEvent={this.checkTypeOfEvent}
            									selectedPerformer={selectedPerformer}
            								/>
										}) : team_events.forEach((specific_event) => {
								   				<EventListing 
                									type_of_events={team_events}
                									methodOfChoice={ParseEventsByTeam}
                									currentEvent={specific_event}
                									checkTypeOfEvent={this.checkTypeOfEvent}
                									selectedPerformer={selectedPerformer}
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