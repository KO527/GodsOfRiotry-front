import React from 'react';



const EventListing = ({currDate, checkTypeOfEvent, eventForecast, type_of_events, currentEvent, methodOfChoice, selectedPerformer}) => {
		

	const toStandardTime = (datetime_local) => {

	  const precisionDecision = "T"
	  datetime_local = datetime_local.replace(precisionDecision, '   ');
	  
	  let miilitaryTime = datetime_local.substr(datetime_local.length - 8, datetime_local.length);
	  let eventDate = datetime_local.substr(0, datetime_local.length - 11);
	  
	  if (militaryTime[0].charAt(0) === 1 && miilitaryTime[0].charAt(1) > 2) {
	    return [eventDate, (miilitaryTime[0] - 12) + ':' + miilitaryTime[1] + ':' + miilitaryTime[2] + ' P.M.'];
	  } else {
	    return [eventDate, miilitaryTime.join(':') + ' A.M.'];
	  }
	}


	return (
	   	    
	   	    <div>
	   	       <span className = 'EventTitle'>
				 {currentEvent.title}
			   </span>
		   	   {currentEvent.performers.map((performer) => {
			     return (<span className="performerNames" onClick={selectedPerformer !== performer.name ? methodOfChoice(performer, currDate, eventForecast).then(checkTypeOfEvent(performer, type_of_events)) : null}>
					   		{performer.name`\n`}
				 		</span>)
		   	   })}
			   <span className='EventName'>			
				 {currentEvent.venue.name}
			   </span>
			   <span className = 'eventDateAndTime'>
			  	{this.toStandardTime(currentEvent.datetime_local)[0], this.toStandardTime(currentEvent.datetime_local)[1]}
			   </span>
			   <span className = 'EventHappenstance'>
				{currentEvent.venue.address, currentEvent.venue.extended_address}
			   </span>
			</div>
	)
}


export default EventListing;

