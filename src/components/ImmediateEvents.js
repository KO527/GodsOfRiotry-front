import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GiveMeImmEvents, ParseEventsByArtist} from '../actions/index';
import EventListing from '../EventListing';

class ImmediateEvents extends Component{
	constructor(props){
		super(props);
		

		this.state = {
			artist: null
		}

	}

	componentDidMount(){
		const {imm_events, currDate, eventForecast, GiveMeImmEvents} = this.props;

		if (imm_events.length === 0){
			GiveMeImmEvents(currDate(), eventForecast());
		}

	}


	shouldComponentUpdate(nextState){
		const { artist } = this.state;
		const { artist_events } = this.props;

		if (artist_events.length === 0 || artist !== nextState.artist){
			return true;
		}
	}


	render(){
		
		const {imm_events, artist_events, ParseEventsByArtist, currDate, eventForecast} = this.props;
		const { artist } = this.state;

                return(
                        <div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
                            {artist_events ? 
	                            artist_events.forEach((event) => {<EventListing 
	                            									type_pf_events={artist_events}
	                            									ParseEventsByArtist={ParseEventsByArtist}
	                            								  />
	                            								}) : imm_events.forEach((event) => {
																        	<EventListing 
																        		type_of_events={imm_events}
																        		ParseEventsByArtist={ParseEventsByArtist}
																			/>
																		})
																	}
							
						</div>
				)
	}	
}

function mapStateToProps(state){
	return{
		imm_events: state.eventOptions.imm_events,
		artist_events: state.eventOptions.artist_events
	}
}

export default connect(mapStateToProps, {GiveMeImmEvents, ParseEventsByArtist})(ImmediateEvents);
