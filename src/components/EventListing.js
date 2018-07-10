import React from 'react';

toStandardTime(datetime_local) {
	  const precisionDecision = "T"
	  datetime_local = datetime_local.replace(precisionDecision, '   ');
	  
	  let miilitaryTime = datetime_local.substr(datetime_local.length - 8, datetime_local.length);
	  let eventDate = datetime_local.substr(0, datetime_local.length - 11);
	  
	  if (miilitaryTime[0].charAt(0) == 1 && miilitaryTime[0].charAt(1) > 2) {
	    return [eventDate, (miilitaryTime[0] - 12) + ':' + miilitaryTime[1] + ':' + miilitaryTime[2] + ' P.M.'];
	  } else {
	    return [eventDate, miilitaryTime.join(':') + ' A.M.'];
	  }
}

const EventListing = ({type_of_events, methodOfChoice}) => (
	
	const {type_of_events} = this.props;

	checkTypeOfEvent(){
		if (type_of_events === artist_events){
			this.setState({artist: performer.name});
		} else if (type_of_events == team_events){
			this.setState({team: performer.name});
		}
	}

	return (
			<div className='EventBlock'>
			   <span className = 'EventTitle'>
				{event.title}
			   </span>
			   	{type_of_events ? 
	   				type_of_events.forEach((event) => {
		   				return (
					   		{event.performers.map((performer) => {
							     return (<span className="performerNames" onClick={if (this.state.team !== team.name){this.props.methodOfChoice(team.name).then(checkTypeOfEvent())}else{return;}}>
									   		{performer.name<br>}
									   	 </span>
									   	)
					   		})}
						   <span className = 'EventName'>			
							 {event.venue.name}
						   </span>
						   <span className = 'eventDateAndTime'>
						  	{this.toStandardTime(event.datetime_local)[0], this.toStandardTime(event.datetime_local)[1]}
						   </span>
						   <span className = 'EventHappenstance'>
							{event.venue.address, event.venue.extended_address}
						   </span>
						)
					})
	   			}		
	)
)


export default EventListing;
