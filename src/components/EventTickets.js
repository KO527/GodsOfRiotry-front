import React, { Component } from 'react';
import ImmediateEvents from './ImmediateEvents';
import SportingEvents from './SportingEvents';
import EventTicketsSearchBar from './EventTicketsSearchBar';


class EventTickets extends Component{
	constructor(props){
		super(props);
		this.state = {
			artist: null			
		}
	     
	     this.current_date = this.current_date.bind(this);
	     this.until_eight_months = this.until_eight_months.bind(this);  
    }

    current_date(){
      	var date = new Date();
      	return date;
    };

    until_eight_months(){
      var eight_months_from_now = new Date();
      eight_months_from_now.setMonth(eight_months_from_now.getMonth() + 8);
  
      return eight_months_from_now;
    };


	render(){
	    return(
			<div className='EventOptions'>
				<div className = 'EventOptionsContainer'>
					<ImmediateEvents currDate = {this.current_date} eventForecast = {this.until_eight_months} />
					<SportingEvents currDate = {this.current_date} eventForecast = {this.until_eight_months}/>
					<EventTicketsSearchBar />
				</div>
			</div>
		)
	}
}

export default EventTickets;

