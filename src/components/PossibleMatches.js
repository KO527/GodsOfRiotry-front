import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import {arrangePieces, defaultPieces, setEvaluatedPiece, getCorrespondingPieces} from '../actions/index';
import {_} from 'lodash';


class PossibleMatches extends Component {
	constructor(props){
		super(props);
		
		this.props.defaultPieces();
			
		const initialState = {
				currentComponent: {whichPiece: {whichType: null, currentUpperComponent: null, currentLowerComponent: null}},
				UpperComponentEnabled: false,
				LowerComponentEnabled: false
		}

		this.state = {
			...initialState
		}	
		
		this.residingUpperComponent = React.createRef();
		this.residingLowerComponent = React.createRef();

		this.focusResidingPiece = this.focusResidingPiece.bind(this);
		//Also need to this.prop.setEvaluatedPiece based off of this.props.setCurrentComponent if callback from Lower or Upper Components elapses time
		this.setNewPiece = this.setNewPiece.bind(this);
		this.centerPiece = this.centerPiece.bind(this);
	}	


	getChildContext(){
		return {whichType: this.state.currentComponent.whichPiece.whichType == 'match' ? 'match' : this.state.currentComponent.whichPiece.whichType == 'bottom' ? 'standalone' : 'standalone', currentUpperComponent: this.state.currentComponent.whichPiece.currentUpperComponent, currentLowerComponent: this.state.currentComponent.whichPiece.currentLowerComponent}
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


	focusResidingPiece(){
		this.residingPiece.current.focus();
	}

	isOppositeComponentSuggested(whichComponent){
		var match = false;
		_.debounce((whichComponent) => {
			this.props.setEvaluatedPiece(whichComponent).then(function(){
				this.props.getCorrespondingPieces();
				if (this.props.contemplatedPiece.merch_type === 'top'){
					this.props.suggestedBottoms.forEach((bottom) => {
						if (this.state.currentComponent.whichPiece.currentLowerComponent === bottom){
						    return match = true;
						}
						else { 
							return;
						}
					});
				}
				else if (this.props.contemplatedPiece.merch_type === 'bottom'){
					this.props.suggestedTops.forEach((top) => {
						if (this.state.currentComponent.whichPiece.currentUpperComponent === top){
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

	setNewPiece(newPiece, whichTypeTho){
		const currentUpperPiece = this.state.currentComponent.whichPiece.currentUpperComponent;
		const currentLowerPiece = this.state.currentComponent.whichPiece.currentLowerComponent;
		const whichType = this.state.currentComponent.whichPiece.whichType;

		if (whichTypeTho == 'match'){
			if (this.state.UpperComponentEnabled){
				this.setState({currentUpperComponent: this.residingUpperComponent, whichType: whichTypeTho});
			}
			else if (this.state.LowerComponentEnabled){
				this.setState({currentLowerComponent: this.residingLowerComponent, whichType: whichTypeTho});
			}
		} else if (whichTypeTho == 'top' && this.residingLowerComponent == null){ //UpperComponentEnabled
			this.setState({currentUpperPiece: this.residingUpperComponent, whichType: whichTypeTho});
		} else if (whichTypeTho == 'bottom' && this.residingUpperComponent == null) { //LowerComponentEnabled
			this.setState({currentLowerPiece: this.residingLowerComponent, whichType: whichTypeTho});
		} else {
			return;
		}
	}


	switchFocus(){
		if (this.residingUpperComponent.hasFocus()){
		 	this.residingLowerComponent.focus();
		}
		else if(this.residingLowerComponent.hasFocus()){		
			this.residingUpperComponent.focus();	
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
		  	        <Wardrobe upperComponent={this.state.currentComponent.whichPiece.currentUpperComponent} lowerComponent={this.state.currentComponent.whichPiece.currentLowerComponent} currentComponent = {this.state.currentComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />
	                <div className = "PossibleMatches_Container">
					    <i className = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
			            {everythingArranged.then(() => 
			            	{this.props.UpperComponents.forEach((topPiece) => {								
						  		return <UpperComponent key={topPiece.id} id={topPiece.id} 
						  							   switchComponent={this.switchFocus} 
						  							   setCurrentPiece = {this.setNewPiece} 
						  							   focusResidingPiece = {this.focusResidingPiece()} 
						  							   evaluatePiece={this.isOppositeComponentSuggested}
						  							   image={topPiece.image}
				    						  		   toggleToPiece = {() => {if (this.state.LowerComponentEnabled === false){this.setState({LowerComponentEnabled: this.enableLowerComp})}else{return;} this.setState({currentLowerComponent: this.props.suggestedBottoms[0]})}} 
						  							   isLowerComponentEnabled={this.state.LowerComponentEnabled}
						  							   ref={this.residingUpperComponent}
						  							   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>;
				            	})
			            	}).then(() => 
		            	  	{this.props.LowerComponents.forEach((bottomPiece) => {
				  				return <LowerComponent key={bottomPiece.id} id={bottomPiece.id} 
				  									   setCurrentPiece = {this.setNewPiece} 
				  									   focusResidingPiece = {this.focusResidingPiece} 
				  									   evaluatePiece={this.isOppositeComponentSuggested}
				  									   image={bottomPiece.image}
				  									   toggleToPiece={() => {if (this.state.UpperComponentEnabled === false){this.setState({UpperComponentEnabled: this.enableUpperComp})}else{return;} this.setState({currentUpperComponent: this.props.suggestedTops[0]})}} 			   
				  									   switchComponent={this.switchFocus}
				  									   isUpperComponentEnabled={this.state.UpperComponentEnabled}
				  									   ref={this.residingLowerComponent}
				  									   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>;						  		 					
				 				})
		        			})
			        	}
		       		</div>
		       </div>
		);
	}
}

PossibleMatches.childContextTypes = {
	enableCapture: React.PropTypes.func,
	setCurrentPiece: React.PropTypes.func,
	currentComponent: React.PropTypes.shape({
		whichPiece: React.PropTypes.shape({
			currentUpperComponent: React.PropTypes.object,
			currentLowerComponent: React.PropTypes.object,
			whichType: React.PropTypes.string
		}),
	}),
	upperComponent: React.PropTypes.object,
	lowerComponent: React.PropTypes.object
};

PossibleMatches.propTypes = {
	setCurrentPiece: React.PropTypes.func,
	enableCapture: React.PropTypes.func,
	currentComponent: PropTypes.shape({
		whichPiece: React.PropTypes.shape({
			currentUpperComponent: React.PropTypes.object,
			currentLowerComponent: React.PropTypes.object,
			whichType: React.PropTypes.string
		}),
	}),
	upperComponent: React.PropTypes.object,
	lowerComponent: React.PropTypes.object,
}

PossibleMatches.defaultProps = {
	whichPiece: {whichType: 'top', currentUpperComponent: contemplatedPiece, currentLowerComponent: suggestedTops[0]},
	UpperComponents: this.props.UpperComponents,
	LowerComponents: this.props.LowerComponents
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
