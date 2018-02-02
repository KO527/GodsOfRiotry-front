class SportingEvents extends REact.Component{
	constructor(){
		super(props);
		this.state = {
			team: null
		}
	}
	render(){
		return(
			<div className = "Sporting_Events">
			    <header className='SportingEventsTitle'>
			         Sporting Events
			    </header>
		            {this.props.ParseSportingEvents.map((event) => {
				<div className='EventBlock'>
				   <span className = 'EventTitle'>
					event.title
				   </span>
			           {event.performers.map((team) => {
					<span className='sportsmen' onClick => (){
					    if (this.state.team !== team["name"]){
					         this.props.ParseEventsByTeam(team).then(function(){
							this.setState({team: team});
						 });
					    }
					    else {
						return;
					    }
					}>
					  team.name	
					</span>
				 });}
				 <span className = 'EventHappenstance'>
					event.happening
				 </span>
				 <span>
					event.venue
				</span>
			    </div>
			  })}
		        </div>
		)
	}
}		
