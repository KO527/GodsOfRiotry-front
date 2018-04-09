import React, { Component } from 'react';

class EventQueries extends Component{
	constructor(props){
		super(props);
		this.state = {
			entertainer: null
		}
	}

	render(){
			
	
		return(
	
				<div className = 'Immediate_Events'>
	                        <header className = 'ImmEventsTitle'>
	                           Upcoming Events
	                        </header>
	                        <div class = 'EventBlock'>
		                        {this.props.queryEvent(this.props.query).forEach((event) => {
			                        	return	<div>
				                                    <span className = 'EventTitle'>JSON.parse(event["title"])</span>
						                            {this.props.artist_events ? 
						                            	this.props.artists_events.forEach((entertainer) => { 
						                            						return <span className = 'ArtistName'>
																					  <span onClick = {this.state.entertainer !== entertainer.name ? this.props.ParseEventsByArtist(entertainer.name, this.props.eventForecast).then(function(){this.setState({artist: entertainer.name})}) : null}>
																							entertainer.name
																					  </span>
																				    </span>}) : 
		            																event.performers.forEach((entertainer) => { return <span className = 'ArtistName'>
																			  																<span onClick = {this.state.entertainer !== entertainer.name ? this.props.ParseEventsByArtist(entertainer.name, this.props.eventForecast).then(function(){this.setState({artist: entertainer.name})}) : null}>
																																				entertainer.name
																															  				</span>
																										  			 			   	   </span>
		 																									     	 		   })
		 																													}
					                        <span className = 'EventHappenstance'>JSON.parse(event["venue"]["name"])</span>
					                        <span className = 'EventAddress'>JSON.parse(event["venue"]["address"]), JSON.parse(event["venue"]["extended_address"])</span>
		                        		</div>	
		                        		})
								}
						    </div>

				</div>
		)
	}
}

export default EventQueries

