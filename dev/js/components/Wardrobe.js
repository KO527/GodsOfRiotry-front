class Wardrobe extends React.Component{

	constructor(){
	    super(props);
	    this.state = {
		PossibleMatches = {...state, [this.props.upperComponent, this.props.lowerComponent]}
	    }

	}
		
	// Snap action
	// A prop method that will have its functionality implemented on the right side to 
	// "capture photos", but will be javascript influenced css of the DOM but will operate
	// for intentions to place photos on the left side.
	// in the wardrobe subclass section of the PossibleMatches component.
	
	// Adding PossibleMatches and scrolling ability to Wardrobe component subclass 
        // refer to https://css-tricks.com/debouncing-throttling-explained-examples/ to make sure wardrobe
        // design is functionally fit to take care of any desired addtional pieces.      


	render(){
		return(
		      <div className = 'Wardrobe'>
		           {this.state.PossibleMatches.map((preference, index) => {
				<div  
				<div className = 'UpperComponent'>
		 		   {preference[0].image}
				</div>
				<div className = 'LowerComponent'>
				  {preference[1].image}	
				</div>   
			  })}
		    </div>
		);
	}
}

