

const EachMatch = props => (
	<div>
         <i class="icon-destroy-link" onClick={this.removeMatch(props.id)}>
                   {if (props.currentComponent){
                        <span class = 'wardrobeStandalonePiece'>
                              {props.currentComponent.image}
                        </span>
	           }}
   	           {if (props.upperComponent && props.lowerComponent){
	           <span className = 'wardrobeUpperComponentContainer'>
		      {props.upperComponent.image}
		   </span>
		   <span className = 'wardrobeLowerComponentContainer'>
		     {props.lowerComponent.image}
		   </span>
		  }}
	</div>	
)

class Wardrobe extends React.Component{
	constructor(){
	    super(props);
	    const wardrobeCounter = 0; 
	    
	    this.state = {
		  PossibleMatches: [{id: wardrobeCounter, upperComponent: null, lowerComponent: null, standaloneComponent: null }];
	          this.removeMatch = this.removeMatch.bind(this),
	          wardrobeCounter: wardrobeCounter	
	    }
	}
	   
   	    	    

        capture(){
           const nextId = this.state.wardrobeCounter + 1;
	   if (this.props.currentComponent){
		this.setState({PossibleMatches: {...this.state.PossibleMatches, id: nextId, standaloneComponent: this.props.currentComponent}, wardrobeCounter: nextId});
	   }
	   else if (this.props.lowerComponent && this.props.upperComponent){
	      this.setState({PossibleMatches: {...this.state.PossibleMatches, id: nextId, upperComponent: this.props.upperComponent, lowerComponent: this.props.lowerComponent}, wardrobeCounter: nextId});
	   }
	   else{
	     break;    	    
	   }
	}
	
	removeMatch(index){
	    var PM = this.state.PossibleMatches;
	    var particularItem;
	    var particularIndex;
	    
	    for(k=0; k<PM.length; k++){
		if(PM[i].id === index){
			particularItem = PM[k];
		}
	    }
    
	    var particularIndex = PM.indexOf(particularItem);
	    if (PM[particularIndex] !== PM[PM.length - 1]){
		const newList = PM.filter(listItem => listItem.id !== index;)   
	    
	    	for(k=particularIndex; k < PM.length; k++){
	    		if (PM[k].id === index){
				newList[k].id = newList[k].id - 1;	
			}	
  	    	}
            	this.setState({PossibleMatches: newList, toDoCounter: newList.length});
	    }
	    else if (PM[particularIndex] === PM[PM.length - 1]){
		PM.slice(particularIndex, 1);
		this.setState({PossibleMatches: PM, wardrobeCounter: PM.length});
	    }
	    else {
		return false;
	    }
	}


	// Snap action
	// A prop method that will have its functionality implemented on the right side to 
	// "capture photos", but will be javascript influenced css of the DOM and will operate
	// for intentions to place photos on the left side.
	// in the wardrobe subclass section of the PossibleMatches component.
	
	// Adding PossibleMatches and scrolling ability to Wardrobe component subclass 
        // refer to https://css-tricks.com/debouncing-throttling-explained-examples/ to make sure wardrobe
        // design is functionally fit to take care of any desired addtional pieces.      
	

	render(){
		return(
		      <div className = 'Wardrobe'>
		           {this.state.PossibleMatches.map((preference, index) => (
         			<EachMatch key={preference.id} {...preference} />                                          ))}
		      </div>
		);
	}
}

