class EventTickets extends React.Component{
	constructor(){
		super(props);
		this.state = {
			artist: null			
		}
	        this.current_date = (){
	      	  var date = new Date();
	      	  return date;
	        }();

	        this.until_eight_months = (){
	          var eight_months_from_now = new Date();
	          eight_months_from_now.setMonth(eight_months_from_now.getMonth() + 8);
		  
	          return eight_months_from_now;
	        }();
        }

	render(){
	    render(
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

export default connect(mapStateToProps, {EventsByArtist, ParseSportingEvents, queryEvent})(EventTickets);

