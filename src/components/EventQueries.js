import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryEvent, ParseEventsByArtist } from '../actions/index';
import EventListing from './EventListing';
import PropTypes from 'prop-types';
import {_} from 'lodash';
import ActivityIndicator from 'react-activity-indicator';
import Loader from 'react-loader-spinner';


class EventQueries extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			selectedPerformer: this.props.query,
			currentQueries: null,
			isFetching: true,
			isFetched: false
		}
		
	}

	async componentDidMount(){
		const { isFetching, isFetched } = this.state;
		const { queryEvent, query, queried_events } = this.props;

		try {
			function summon(){
				queryEvent(query);
			}
			await summon();	
		}
		catch(error) {
			throw Error(error);
		}

		if (queried_events.length !== 0){
			this.setState({currentQueries: queried_events, isFetching: false, isFetched: true});
		}
		else if (queried_events.length === 0){
			return;
		}
	}

	shouldComponentUpdate(nextState){

		const { queryEvent, queried_events } = this.props;
		const { selectedPerformer } = this.state;
		
		if (selectedPerformer !== nextState.selectedPerformer && selectedPerformer !== null){
			queryEvent(selectedPerformer);
			return true;
		}

		return false;
	}


	renderDecision(){

		const { queryEvent, queried_events, isFetching, isFetched } = this.props;
		const { selectedPerformer } = this.state;

		if (isFetching){
        	return( <div className='activityLoader'>
      			 		<Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
      		 	 	</div>)
        }
        else if (isFetched){
            return (<div>
	            		<header className = 'QueriedEventsTitle'>
		                   	Upcoming Events
		                </header>
		              	<div className='EventBlock'>
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
					</div>)
		}
	}


	render(){

		return(
	
			<div className = 'EventQueries'>
                {this.renderDecision()}
			</div>
		)
	}
}

EventQueries.propTypes = {
		isFetching: PropTypes.bool,
		isFetched: PropTypes.bool
}

function mapStateToProps(state){

	return {queried_events: state.eventOptions.queried_events}
}

export default connect(mapStateToProps, {queryEvent})(EventQueries)

