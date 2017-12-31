class Wardrobe extends React.Component{

	constructor(){
	    super(props);
	    this.state = {
		PossibleMatches = {...state, [this.props.upperComponent, this.props.lowerComponent]}
	    }

	}
	
	render(){
		return(
			this.state.PossibleMatches.map((preference) => {
			   <div className = 'possibleMatch'>
				<div className = 'UpperComponent'>
					{preference[0]}
				</div>
				<div className = 'LowerComponent'>
					{preference[1]}	
				</div>   
		  	   </div>
			}
		);
	}
}

