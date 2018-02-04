class ImmediateEvents extends React.Component{
	constructor(){
		super(props);
		this.state = {
			artist: null
		}
	}

	render(){
                return(
                        <div className = 'Immediate_Events'>
                        <header className = 'ImmEventsTitle'>
                           Upcoming Events
                        </header>
                        {this.props.GiveMeImmEvents.map((event) => {
                              <div class = 'EventBlock'>
                                   <span className = 'EventTitle'>JSON.parse(event["title"]</span>
                                   {event.performers.map((entertainer) => {
                                        <span className = 'ArtistName' onClick = (){if (this.state.artist !== entertainer.name){this.props.EventsByArtist(entertainer.name).then(function(){this.setState({artist: entertainer.name})}}>
                                           entertainer.name
                                        </span>
                                    });}
                                    <span className = 'EventHappenstance'>JSON.parse(event["venue"]["name"])</span>
                                    <span className = 'EventAddress'>JSON.parse(event["venue"]["address"]), JSON.parse(event["venue"]["extended_address"])</span>                                             
                               </div>})
			})}
                        </div>
               )
	}
}

export default connect(mapStateToProps, {GiveMeImmEvents})(ImmediateEvents);
