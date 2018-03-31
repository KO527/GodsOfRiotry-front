import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryEvent from '../actions/index';

class EventQueries extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			entertainer: null
		}
	}

	render(){
			
		 const artists = <span className = 'ArtistName' onClick = {this.state.entertainer !== entertainer.name ? this.props.ParseEventsByArtist(entertainer.name, this.props.eventForecast).then(function(){this.setState({artist: entertainer.name})}) : null}>
                      		entertainer.name
                         </span>;


		return(
	
				<div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
	                        {this.props.queryEvent(this.props.query).map((event) => {
	                                <div class = 'EventBlock'>
	                                    <span className = 'EventTitle'>JSON.parse(event["title"])</span>
		                                   {this.props.artist_events ? this.props.artists_events.map((entertainer) => { return artists }) : event.performers.map((entertainer) => { return artists })}	
				                        <span className = 'EventHappenstance'>JSON.parse(event["venue"]["name"])</span>
				                        <span className = 'EventAddress'>JSON.parse(event["venue"]["address"]), JSON.parse(event["venue"]["extended_address"])</span>                                             
	                        		</div>
	                        	})
							}
				</div>
		)
	}
}

export default EventQueries

