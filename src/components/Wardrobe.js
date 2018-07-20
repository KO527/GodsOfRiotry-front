import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function EachMatch(props, context){

		return (		
	 	    <div>
	         	<i className = "icon-destroy-link" onClick={() => props.removeMatch(props.id)}></i> 
	         		{context.whichType === 'standalone' && context.currentUpperComponent  ? 
	     			   		<span className = 'wardrobeStandalonePiece'>
	                          	{context.currentUpperComponent.image}
	                    	</span>
	                : context.whichType === 'standalone' && context.currentLowerComponent ? 
		                 	<span className = 'wardrobeStandalonePiece'>
                         		{context.currentLowerComponent.image}
                    		</span>
	                : context.whichType === 'match' && context.currentLowerComponent && context.currentUpperComponent ?
		           			<div className = 'PossibleMatchContainer'>
			           			<span className = 'wardrobeUpperComponent'>
			           				{context.currentUpperComponent.image}
			           			</span>
			           			<span className = 'wardrobeLowerComponent'>
			           				{context.currentLowerComponent.image}
			           			</span>
			           		</div>
			        : null
			    	}
			</div>
		)
};

EachMatch.contextTypes = {
	currentUpperComponent: PropTypes.object,
	currentLowerComponent: PropTypes.object,
	whichType: PropTypes.string
}


class Wardrobe extends Component{
	constructor(props){
	    super(props);
	    const wardrobeCounter = 0; 
	    const date = new Date();

	    this.state = {
		  PossibleMatches: [{id: wardrobeCounter, createdAt: date, upperComponent: this.props.upperComponent, lowerComponent: this.props.lowerComponent, standaloneComponent: null, whichType: null}],
 	      wardrobeCounter: wardrobeCounter,
 	      removeMatch: this.removeMatch.bind(this)
	    }    
	}
   
	getChildContext(){
		const {PossibleMatches} = this.state
		var PM = PossibleMatches;
		var lastOne = PM[PM.length - 1];
		if (lastOne.upperComponent && lastOne.lowerComponent){
			return {currentUpperComponent: lastOne.upperComponent,
					currentLowerComponent: lastOne.lowerComponent,
					whichType: 'match'}
		}
		else if (lastOne.upperComponent && lastOne.lowerComponent == null){
			return {currentUpperComponent: lastOne.standaloneComponent,
					whichType: 'standalone'}
		}
		else if (lastOne.lowerComponent && lastOne.upperComponent == null){
			return {currentLowerComponent: lastOne.standaloneComponent,
					whichType: 'standalone'}
		}
		else{
			return {currentLowerComponent: null, currentUpperComponent: null, whichType: ''}
		}
	}
   
    componentDidMount(){
	 	this.props.enableCapture(this.capture);		
	}   
	

	shouldComponentUpdate(nextProps, nextState){
		const { PossibleMatches } = this.state;

		for (var i = 0; i < PossibleMatches; i++){
			if (nextState.PossibleMatches[nextState.PossibleMatches.length - 1] !== PossibleMatches[i]){
				return true;
			}
			else if (nextState.PossibleMatches[nextState.PossibleMatches.length - 1] === PossibleMatches[i]){
				return false;
			}
		}
		return false;
	}

    capture(){

    	const {currentUpperComponent, currentLowerComponent, upperComponent, lowerComponent} = this.props;

           const nextId = this.state.wardrobeCounter + 1;
		   if (currentUpperComponent && currentLowerComponent === null){
				this.setState({PossibleMatches: [...this.state.PossibleMatches, {id: nextId, standaloneComponent: upperComponent}], wardrobeCounter: nextId}).then(() => {
					return {currentUpperComponent: this.state.PossibleMatches[this.state.PossibleMatches.length - 1].currentUpperComponent};
				});
			  	localStorage.setItem(this.state.possibleMatches[this.state.possibleMatches.length - 1].id, this.state.possibleMatches[this.state.possibleMatches.length - 1]);		
		   }
		   else if (currentLowerComponent && currentUpperComponent === null){
		      this.setState({PossibleMatches: [...this.state.PossibleMatches, {id: nextId, standaloneComponent: lowerComponent}], wardrobeCounter: nextId}).then(() => {
		      		return {currentLowerComponent: this.state.PossibleMatches[this.state.PossibleMatches.length - 1].currentLowerComponent}
		      });
		      localStorage.setItem(this.state.possibleMatches[this.state.possibleMatches.length - 1].id, this.state.possibleMatches[this.state.possibleMatches.length - 1]);
		   }
		   else if (currentLowerComponent & currentUpperComponent){
		   		this.setState({PossibleMatches: [...this.state.PossibleMatches, {id: nextId, upperComponent: upperComponent, lowerComponent: lowerComponent}], wardrobeCounter: nextId}).then(() => {
		   			return {currentUpperComponent: this.state.PossibleMatches[this.state.PossibleMatches.length - 1].currentUpperComponent, currentLowerComponent: this.state.PossibleMatches[this.state.PossibleMatches.length - 1].currentLowerComponent};
		   		});
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

	    for(var k=0; k<PM.length; k++){
			if(PM[k].id === index){
				particularItem = PM[k];
			}
	    }
    
	    particularIndex = PM.indexOf(particularItem);
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
		        <ReactCSSTransitionGroup transitionName = "EachMatch" transitionEnterTimeout = {300} transitionLeaveTimeout = {300}>
					{this.state.PossibleMatches.map((preference, index) => {
	         			return <EachMatch key={preference.createdAt} removeMatch={this.state.removeMatch}/>
					})}		
			 	</ReactCSSTransitionGroup>
		      </div>
		)
	}
}

Wardrobe.childContextTypes = {
	currentUpperComponent: PropTypes.object,
	currentLowerComponent: PropTypes.object,
	whichType: PropTypes.string
}

export default Wardrobe