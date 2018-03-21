

const EachMatch = props => (
	<div>
         <i class="icon-destroy-link" onClick={this.removeMatch(props.id)}></i> 
	          
         		(props.currentComponent.whichPiece) ? return {
         			    <span class = 'wardrobeStandalonePiece'>
                              {props.currentComponent.whichPiece.image}
                        </span>
                    } : (props.upperComponent && props.lowerComponent) ? return { 
                        <span class = 'wardrobeStandalonePiece'>
                              {props.currentComponent.whichPiece.image}
                        </span>
	           		} : return;
	</div>	
)

class Wardrobe extends React.Component{
	constructor(props){
	    super(props);
	    const wardrobeCounter = 0; 
	    const date = new Date();

	    this.state = {
		  PossibleMatches: [{id: wardrobeCounter, createdAt: date, upperComponent: null, lowerComponent: null, standaloneComponent: null }],
 	      wardrobeCounter: wardrobeCounter	
	    }    
	    this.removeMatch = this.removeMatch.bind(this);
	}
   
	
	componentDidMount(){
		this.props.enableCapture(this.capture);		
	}   
	

	shouldComponentUpdate(nextProps, nextState){
		for (i = 0; i < this.state.PossibleMatches; i++){
			if (nextState.PossibleMatches[nextState.PossibleMatches.length - 1] !== this.state.PossibleMatches[i]){
				continue;
			}else if (nextState.PossibleMatches[nextState.PossibleMatches.length - 1] == this.state.PossibleMatches[i]){
				return false;
			}
			else{
				return true;
			}
		}
	}

    capture(){
           const nextId = this.state.wardrobeCounter + 1;
		   if (this.props.currentComponent){
				this.setState({PossibleMatches: [...this.state.PossibleMatches, {id: nextId, standaloneComponent: this.props.currentComponent}], wardrobeCounter: nextId});
			  	localStorage.setItem(this.state.possibleMatches[this.state.possibleMatches.length - 1].id, this.state.possibleMatches[this.state.possibleMatches.length - 1]);		
		   }
		   else if (this.props.lowerComponent && this.props.upperComponent){
		      this.setState({PossibleMatches: [...this.state.PossibleMatches, {id: nextId, upperComponent: this.props.upperComponent, lowerComponent: this.props.lowerComponent}], wardrobeCounter: nextId});
		      localStorage.setItem(this.state.possibleMatches[this.state.possibleMatches.length - 1].id, this.state.possibleMatches[this.state.possibleMatches.length - 1]);
		   }
		   else{
		     return;    	    
		   }
	}

	removeMatch(index){
	    var PM = this.state.PossibleMatches;
	    var particularItem;
	    var particularIndex;
	    
	    for(k=0; k<PM.length; k++){
			if(PM[k].id === index){
				particularItem = PM[k];
			}
	    }
    
	    var particularIndex = PM.indexOf(particularItem);
	    if (PM[particularIndex] !== PM[PM.length - 1]){
			const newList = PM.filter(listItem => listItem.id !== index)   
	    	for(k=particularIndex; k < PM.length; k++){
	    		if (PM[k].id === index){
			    	newList[k].id = newList[k].id - 1;
		            localStorage.setItem(newList[k].id, newList[k]);	
				}	
  	    	}
            this.setState({PossibleMatches: newList, wardrobeCounter: newList.length});
	    }
	    else if (PM[particularIndex] === PM[PM.length - 1]){
			PM.slice(particularIndex, 1);
			localStorage.removeItem(PM[particularIndex].id);
			this.setState({PossibleMatches: PM, wardrobeCounter: PM.length});
	    }
	    else {
			return false;
	    }
	}


	// Adding PossibleMatches and scrolling ability to Wardrobe component subclass 
        // refer to https://css-tricks.com/debouncing-throttling-explained-examples/ to make sure wardrobe
        // design is functionally fit to take care of any desired addtional pieces.      
	

	render(){
		return(
		      <div className = 'Wardrobe'>
		        <ReactTransitionGroup transitionName = "EachMatch" transitionEnterTimeout = {300} transitionLeaveTimeout = {300}>
					{this.state.PossibleMatches.map((preference, index) => {
	         			return <EachMatch key={preference.createdAt} {...preference} />
					})}		
			 	</ReactTransitionGroup>
		      </div>
		);
	}
}

