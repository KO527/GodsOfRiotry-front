import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import {setContemplatedPiece, getInitialPieces, getAncillaryPieces, organizePieces} from '../actions/index';

class PossibleMatches extends React.Component{
	constructor(props){
		super(props);
		this.props.getInitialPieces();
		
		const organizedPiecesArray = this.props.organizePieces().map(function(results){
			return {
				UpperComponents: results.PossibleMatches.UpperComponents,
				LowerComponents: results.PossibleMatches.LowerComponents
			}
		});

		const initialState = {
				fieldForOrganizedPiecesArray: organizedPiecesArray,
				currentComponent: {whichType: null, whichPiece: null},
				UpperComponentEnabled: false,
				LowerComponentEnabled: false
		}

		if (this.props.contemplatedPiece.merch_type === 'top'){
			this.state = {
				...initialState,
		        currentLowerComponent: this.props.suggestedBottoms[0],
	  			currentUpperComponent: this.props.contemplatedPiece,
		    }
		}
        else if (this.props.contemplatedPiece.merch_type == 'bottom'){
			this.state = {
				...initialState,
				currentLowerComponent: this.props.contemplatedPiece,
				currentUpperComponent: this.props.suggestedTops[0],
	    	}
		};
	}
	
	isOppositeComponentSuggested(whichComponent){
		var match = false;
		_.debounce((whichComponent) => {
			this.props.setContemplatedPiece(whichComponent).then(function(){
				this.props.getAncillaryPieces();
				if (this.props.contemplatedPiece.merch_type == 'top'){
					this.props.suggestedBottoms.map((bottom) => {
						if (this.state.currentLowerComponent == bottom){
						        match = true;
						}
					});
				}
				else if (this.props.contemplatedPiece.merch_type == 'bottom'){
					this.props.suggestedTops.map((top) => {
						if (this.state.currentUpperComponent == top){
							match = true;
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
		 return(
	  	       <div> className 'GorClothingContainer'>
		  	        <Wardrobe upperComponent={this.state.currentUpperComponent} lowerComponent={this.state.currentLowerComponent} currentComponent = {this.state.currentComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />
	                <div className = "PossibleMatches_Container">
					    <i class = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
			            {this.state.fieldForOrganizedPiecesArray.UpperComponents.map((topPiece) => {
					  		 return <UpperComponent key={topPiece.id} id={topPiece.id} ref={(piece)=>{this.setState({currentUpperComponent: piece})}} setCurrentComponent = {(piece) => this.setState(currentComponent.whichPiece: piece, currentComponent.whichComponent: 'u', lowerComponent: null, upperComponent: null)}  toggleToPiece = {(() => {if (this.state.LowerComponentEnabled === false){this.setState(LowerComponentEnabled: true)}else{return;}}).then(function(){this.setState({currentLowerComponent: this.props.suggestedBottoms[0]})}())} image={topPiece.image} isLowerComponentEnabled={this.state.LowerComponentEnabled} switchComponent={this.switchFocus} evaluatePiece={this.isOppositeComponentSuggested} className = {this.state.currentComponent.whichComponent === 'u' ? 'standalonePiece' : this.state.currentComponent.whichComponent === 'l' ? 'PossibleMatchCollapse' : 'UpperComponent_Container'}/>;
			            })}
			        	{this.state.fieldForOrganizedPiecesArray.LowerComponents.map((bottomPiece) => {
					  		 return <LowerComponent key={bottomPiece.id} id={bottomPiece.id} ref={(piece)=>{this.setState({currentLowerComponent: piece})}} setCurrentComponent = {(piece) => this.setState(currentComponent.whichPiece: piece, currentComponent.whichComponent: 'l', upperComponent: null, lowerComponent: null)}  toggleToPiece={(() => {if (this.state.UpperComponentEnabled === false){this.setState(UpperCompoenentEnabled: true)}else{return;}}).then(function(){this.setState({currentUpperComponent: this.props.suggestedTops[0]})}())} image={bottomPiece.image} isUpperComponentEnabled={this.state.UpperComponentEnabled} switchComponent={this.switchFocus} evaluatePiece={this.isOppositeComponentSuggested} className = {this.state.currentComponent.whichComponent === 'l' ? 'standalonePiece' : this.state.currentComponent.whichComponent === 'u' ? 'PossibleMatchCollapse' : 'LowerComponent_Container'}/>;
					 	})}
		       		</div>
		       </div>
		 );
	}
}

function mapStateToProps(state){
	return {contemplatedPiece: state.possibleMatches.contemplated_piece,
			extraTops: state.possibleMatches.extraTops,
			extraBottoms: state.possibleMatches.extraBottoms,
			standaloneTops: state.possibleMatches.standaloneTops,
			standaloneBottoms: state.possibleMatches.standaloneBottoms,
			suggestedTops: state.possibleMatches.suggestedTops,
			suggestedBottoms: state.possibleMatches.suggestedBottoms
	};
}

export default connect(mapStateToProps, {setContemplatedPiece, getInitialPieces, getAncillaryPieces, organizePieces})(PossibleMatches)
