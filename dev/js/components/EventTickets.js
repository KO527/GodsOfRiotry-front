class EventTickets extends React.Component{
	constructor(){
		super(props);
		this.state = {
			artist: null			
		}
	        this.event_forecast = (){
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
					<ImmediateEvents />
					<SportingEvents />
					<EventSearchBar />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, {EventsByArtist, ParseSportingEvents, queryEvent})(EventTickets);

