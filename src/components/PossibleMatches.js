import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import {arrangePieces, defaultPieces, setEvaluatedPiece, getCorrespondingPieces} from '../actions/index';
import {_} from 'lodash';


class PossibleMatches extends Component{
	constructor(props){
		super(props);
		
		this.props.defaultPieces();
			
		const initialState = {
				currentComponent: {whichType: null, whichPiece: null},
				UpperComponentEnabled: false,
				LowerComponentEnabled: false,
				currentLowerComponent: null,
				currentUpperComponent: null
		}
		this.state = {
			...initialState
		}

		
		//Also need to this.prop.setEvaluatedPiece based off of this.props.setCurrentComponent if callback from Lower or Upper Components elapses time
	}	

	componentDidMount(){
		if (this.props.contemplatedPiece.merch_type === 'top'){
				this.setState({currentLowerComponent: this.props.suggestedBottoms[0], 
							   currentUpperComponent: this.props.contemplatedPiece});
		}
		else if (this.props.contemplatedPiece.merch_type === 'bottom'){
				this.setState({currentLowerComponent: this.props.contemplatedPiece,
							   currentUpperComponent: this.props.suggestedTops[0]});
		}
	}


	isOppositeComponentSuggested(whichComponent){
		var match = false;
		_.debounce((whichComponent) => {
			this.props.setEvaluatedPiece(whichComponent).then(function(){
				this.props.getCorrespondingPieces();
				if (this.props.contemplatedPiece.merch_type === 'top'){
					this.props.suggestedBottoms.forEach((bottom) => {
						if (this.state.currentLowerComponent === bottom){
						    return match = true;
						}
						else { 
							return;
						}
					});
				}
				else if (this.props.contemplatedPiece.merch_type === 'bottom'){
					this.props.suggestedTops.forEach((top) => {
						if (this.state.currentUpperComponent === top){
							return match = true;
						}				
						else {
							return;
						}
					});		
				};
			}, 6000);
		});
		return match;
	}
	
	switchFocus(){
		if (this.state.currentUpperComponent.hasFocus()){
		 	this.state.currentLowerComponent.focus();
		}
		else if(this.state.currentLowerComponent.hasFocus()){		
			this.state.currentUpperComponent.focus();	
		}
		else {
		  return;
		}
	}


	render(){

		var everythingArranged = new Promise((resolve, reject) => {
				this.props.arrangePieces();
		});

		return(	 
	  	       <div className = 'GorClothingContainer'>
		  	        <Wardrobe upperComponent={this.state.currentUpperComponent} lowerComponent={this.state.currentLowerComponent} currentComponent = {this.state.currentComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />
	                <div className = "PossibleMatches_Container">
					    <i className = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
			            {everythingArranged.then(() => 
			            	{this.props.UpperComponents.forEach((topPiece) => {								
						  		return <UpperComponent key={topPiece.id} id={topPiece.id} ref={(piece)=>{
						  		 	this.thisComponent = this.state.currentComponent;
								    this.thisComponent.whichComponent = 'u';
						  		 	this.thisComponent.whichPiece = piece;
						  		 	this.enableLowerComp = this.state.LowerComponentEnabled;
						  		 	this.enableLowerComp = true;
						  		 	this.setState({currentUpperComponent: piece})}} 
						  		 	setCurrentComponent = {(piece) => this.setState({currentComponent: this.thisPiece, currentLowerComponent: null, currentUpperComponent: null})} 
						  		 	toggleToPiece = {(() => {if (this.state.LowerComponentEnabled === false){this.setState({LowerComponentEnabled: this.enableLowerComp})}else{return;}}).then(function(){this.setState({currentLowerComponent: this.props.suggestedBottoms[0]})}())} 
						  		 	image={topPiece.image} 
						  		 	isLowerComponentEnabled={this.state.LowerComponentEnabled} 
						  		 	switchComponent={this.switchFocus} 
						  		 	evaluatePiece={this.isOppositeComponentSuggested} 
						  		 	className = {this.state.currentComponent.whichComponent === 'u' ? 'standalonePiece' : this.state.currentComponent.whichComponent === 'l' ? 'PossibleMatchCollapse' : 'UpperComponent_Container'}/>;
				            	})}).then(() => {
				            	  	this.props.LowerComponents.forEach((bottomPiece) => {
						  				return <LowerComponent key={bottomPiece.id} id={bottomPiece.id} ref={(piece)=>{
						        		 	this.thisComponent = this.state.currentComponent;
										    this.thisComponent.whichComponent = 'l';
										    this.thisComponent.whichPiece = piece;
								  		 	this.enableUpperComp = this.state.UpperComponentEnabled;
								  		 	this.enableUpperComp = true;
								  		 	this.setState({currentLowerComponent: piece})}} 
								  		 	setCurrentComponent = {(piece) => this.setState({currentComponent: this.thisPiece, currentUpperComponent: null, currentLowerComponent: null})} 
								  		 	toggleToPiece={(() => {if (this.state.UpperComponentEnabled === false){this.setState({UpperComponentEnabled: this.enableUpperComp})}else{return;}}).then(function(){this.setState({currentUpperComponent: this.props.suggestedTops[0]})}())} 
								  		 	image={bottomPiece.image} 
								  		 	isUpperComponentEnabled={this.state.UpperComponentEnabled} 
								  		 	switchComponent={this.switchFocus} evaluatePiece={this.isOppositeComponentSuggested} 
								  		 	className = {this.state.currentComponent.whichComponent === 'l' ? 'standalonePiece' : this.state.currentComponent.whichComponent === 'u' ? 'PossibleMatchCollapse' : 'LowerComponent_Container'}/>;
						 				})
				        		}
			        		)}
		       		</div>
		       </div>
		);
	}
}


function mapDispatchToProps(dispatch){
  return {
    defaultPieces: () => {
      dispatch(defaultPieces())
    },
    arrangePieces: () => {
    	dispatch(arrangePieces())
    },
    getCorrespondingPieces: () => {
    	dispatch(getCorrespondingPieces())
    },
    setEvaluatedPiece: () => {
    	dispatch(setEvaluatedPiece())
    }
  }
}

function mapStateToProps(state){

	return {
			UpperComponents: state.possibleMatches.UpperComponents,
			LowerComponents: state.possibleMatches.LowerComponents,
			contemplatedPiece: state.possibleMatches.contemplated_piece,
			extraTops: state.possibleMatches.extraTops,
			extraBottoms: state.possibleMatches.extraBottoms,
			standaloneTops: state.possibleMatches.standaloneTops,
			standaloneBottoms: state.possibleMatches.standaloneBottoms,
			suggestedTops: state.possibleMatches.suggestedTops,
			suggestedBottoms: state.possibleMatches.suggestedBottoms
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PossibleMatches)
