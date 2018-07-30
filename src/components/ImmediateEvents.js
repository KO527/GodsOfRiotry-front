import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GiveMeImmEvents, ParseEventsByArtist} from '../actions/event_actions';
import EventListing from './EventListing';
import PropTypes from 'prop-types';

class ImmediateEvents extends Component{
	constructor(props){
		super(props);
		

		this.state = {
			selectedPerformer: null
		}

	}

	componentDidMount(){
		const {imm_events, currDate, eventForecast, GiveMeImmEvents} = this.props;

		if (imm_events.length === 0){
			GiveMeImmEvents(currDate(), eventForecast());
		}

	}


	shouldComponentUpdate(nextState){
		const { selectedPerformer } = this.state;
		const { ParseEventsByArtist, currDate, eventForecast } = this.props;

		if (selectedPerformer !== nextState.selectedPerformer && selectedPerformer !== null){
			ParseEventsByArtist(currDate(), eventForecast(), selectedPerformer);
			return true;
		}

		return false;
	}


	render(){
		
		const {imm_events, artist_events, ParseEventsByArtist, currDate, eventForecast} = this.props;
		const { selectedPerformer } = this.state;

        return(
    			<div className = 'Immediate_Events'>
           			<header className = 'ImmEventsTitle'>
                   		Upcoming Events
                	</header>
                	<div className = 'EventBlock'>
                    {artist_events ? 
                        	artist_events.forEach((event) => {<EventListing 
	                        									type_of_events={artist_events}
	                        									currentEvent={event}
	                            								methodOfChoice={ParseEventsByArtist}
	                            								selectedPerformer={selectedPerformer}
	                            								changeState={this.checkTypeOfEvent}
                        								  	/>
                        								}) : imm_events.forEach((event) => {
														        	<EventListing 
														        		type_of_events={imm_events}
														        		methodOfChoice={ParseEventsByArtist}
														        		currentEvent={event}
														        		selectedPerformer={selectedPerformer}
														        		checkTypeOfEvent={this.checkTypeOfEvent}
																	/>
																})}
                	</div>	
				</div>
		)
	}	
}

const myPropTypes = ImmediateEvents.propTypes = {
						ParseEventsByArtist: PropTypes.func,
						GiveMeImmEvents: PropTypes.func,
						currDate: PropTypes.func,
						eventForecast: PropTypes.func,
						imm_events: PropTypes.arrayOf(PropTypes.object),
						artist_events: PropTypes.arrayOf(PropTypes.object)
					}

var stateProps = mapStateToProps;

PropTypes.checkPropTypes(myPropTypes, stateProps, 'prop', 'ImmediateEvents');


function mapStateToProps(state){
	return{
		imm_events: state.eventOptions.imm_events,
		artist_events: state.eventOptions.artist_events
	}
}

export default connect(mapStateToProps, {GiveMeImmEvents, ParseEventsByArtist})(ImmediateEvents);
