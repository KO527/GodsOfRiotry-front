import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryEvent, ParseEventsByArtist } from '../actions/index';
import EventListing from './EventListing';



class EventQueries extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			selectedPerformer: this.props.query,
			currentQuery: this.props.queried_events
		}
		
	}

	shouldComponentUpdate(nextState){

		const { queryEvent } = this.props;
		const { selectedPerformer } = this.state;
		
		if (selectedPerformer !== nextState.selectedPerformer && selectedPerformer !== null){
			queryEvent(selectedPerformer);
			return true;
		}

		return false;
	}

	render(){
			
		const { queryEvent, queried_events} = this.props;
		const { selectedPerformer } = this.state;

		return(
	
                <div className = 'EventBlock'>
						<div className = 'EventQueries'>
	                        <header className = 'QueriedEventsTitle'>
	                           Upcoming Events
	                        </header>
                        	{queried_events ? queried_events.forEach((event) => { 
                    								<EventListing 
                    									type_of_events={queried_events}
                    									currentEvent={event}
                        								methodOfChoice={queryEvent}
                        								selectedPerformer={selectedPerformer}
                        								changeState={this.checkTypeOfEvent}
                    								  />
                    							}) : null}		
						</div>
				</div>
		)
	}
}


function mapStateToProps(state){

	return {queried_events: state.eventOptions.queried_events}
}

export default connect(mapStateToProps, {queryEvent, ParseEventsByArtist})(EventQueries)

