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

		const artists = <span className = 'ArtistName' onClick = { this.state.artist !== entertainer.name ? this.props.ParseEventsByArtist(entertainer.name, this.props.eventForecast).then(function(){this.setState({artist: entertainer.name})}) : return null}>
                            entertainer.name
                        </span>;
 
                return(
                        <div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
	                        {this.props.GiveMeImmEvents.map((event) => {
	                                <div class = 'EventBlock'>
	                                    <span className = 'EventTitle'>JSON.parse(event["title"])</span>
		                                   {this.props.artist_events ? this.props.artists_events.map((entertainer) => { artists }) : event.performers.map((entertainer) => { artists })}	
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

export default connect(mapStateToProps, {GiveMeImmEvents, ParseEventsByArtist, queryEvent})(ImmediateEvents);
