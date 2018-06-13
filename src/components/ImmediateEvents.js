import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImmediateEvents extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			artist: null
		}
	}

	render(){
				var EventsParsed = new Promise(function(resolve, reject){
						resolve(this.props.ParseEventsByArtist(entertainer.name, this.props.eventForecast));
				});

                return(
                        <div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
	                        {this.props.GiveMeImmEvents.map((event) => {
	                                <div className = 'EventBlock'>
	                                    <span className = 'EventTitle'>JSON.parse(event["title"])</span>
		                                   {this.props.artist_events ? 
		                                   	this.props.artists_events.forEach((entertainer) => {return <span>
	               																						 <span className = 'ArtistName' onClick = { this.state.artist !== entertainer.name ? EventsParsed.then(function(){this.setState({artist: entertainer.name})}) : return;}>
																		                            		entertainer.name
																		                        		 </span>
																		                        	   </span> }) : event.performers.forEach((entertainer) => { return <span>
																				                        	  															  <span className = 'ArtistName' onClick = { this.state.artist !== entertainer.name ? EventsParsed.then(function(){this.setState({artist: entertainer.name})}) : return;}>
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
