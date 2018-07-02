import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GiveMeImmEvents, ParseEventsByArtist} from '../actions/index';

class ImmediateEvents extends React.Component{
	constructor(props){
		super(props);
		
		if (this.props.imm_events == []){
			this.props.GiveMeImmEvents();
		}

		this.state = {
			artist: null
		}

		this.ParseEventsByArtist = this.props.ParseEventsByArtist.bind(this);
		this.eventForecast = this.props.eventForecast.bind(this);
	}

	render(){

                return(
                        <div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
	                        {this.props.imm_events.map((event) => {
	                                <div className = 'EventBlock'>
	                                    <span className = 'EventTitle'>JSON.parse(event["title"])</span>
		                                   {this.props.artist_events ? 
		                                   	this.props.artists_events.forEach((entertainer) => {return <span>
	               																						 <span className = 'ArtistName' onClick = { this.state.artist !== entertainer.name ? new Promise(function(resolve, reject, entertainer){this.ParseEventsByArtist(entertainer.name, this.eventForecast);}).then(function(){this.setState({artist: entertainer.name})}) : ''}>
																		                            		entertainer.name
																		                        		 </span>
																		                        	   </span> }) : event.performers.forEach((entertainer) => { return <span>
																				                        	  															  <span className = 'ArtistName' onClick = { this.state.artist !== entertainer.name ? new Promise(function(resolve, reject, entertainer){this.ParseEventsByArtist(entertainer.name, this.eventForecast);}).then(function(){this.setState({artist: entertainer.name})}) : ''}>
																																					                            entertainer.name
																																					                      </span>
																																			                  	  	   </span>})}
				                        <span className = 'EventHappenstance'>JSON.parse(event["venue"]["name"])</span>
				                        <span className = 'EventAddress'>JSON.parse(event["venue"]["address"]), JSON.parse(event["venue"]["extended_address"])</span>                                             
	                        		</div>
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
