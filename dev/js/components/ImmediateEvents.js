class ImmediateEvents extends React.Component{
	constructor(){
		super(props);
		this.state = {
			artist: null
		}
	}
	render(){
		<div className = 'Immediate_events'>
		<header className='ImmEventsTitle">
			Upcoming Events
		</header>
		{this.props.GiveMeImmEvents.map((event) => {
			<div className = 'EventBlock'>
				<span className = 'EventTitle'>
					event.title
				</span>
				{event.performers.map((entertainer) => {
					<span className = 'ArtistName' onClick = (){
					   if (this.state.artist !== entertainer.name){
						this.props.EventsByArtist(entertainer.name).then(function(){this.setState({artist: entertainer.name});});
					   }else {
						return null;
					   }}>
					   entertainer.name
					</span>
				});}
				<span className = 'EventHappenstance'>
					event.happening
				</span>
				<span className = 'EventVenue'>
					event.venue
				</span>
			</div>
		})}
		</div>
	}
}

