class EventTickets extends React.Component{
	constructor(){
		super(props);
		this.state = {
				
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
		return(
			<div className = 'Immediate_Events'>
			<header className = 'ImmEventsTitle'>
			   Upcoming Events
			</header>
			{this.props.GiveMeImmEvents.map((event) => {
			   <div class = 'EventBlock'>	
				<span className = 'EventTitle'>event.title</span>
				{event.performers.map((entertainer) => {
					<span className = 'ArtistName' onClick = {this.props.EventsByArtist(entertainer)}>
					entertainer.name
					</span>
				});}
				<span className = 'EventHappenstance'>event.happening</span>
				<span className = 'EventVenue'>event.venue</span> 
			   </div>
			})}
			</div>
		)
	
	}
}
export default connect(mapStateToProps, {EventsByArtist, GiveMeImmEvents, ParseSportingEvents, for})(EventTickets);

