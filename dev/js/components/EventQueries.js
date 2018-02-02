class EventQueries extends React.Component{
	constructor(props){
		super(props);
		this.props.queryEvent(this.props.query);
	}
}

export default connect(mapStateToProps, {queryEvent})(EventQueries)

