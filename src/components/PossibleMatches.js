import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import {arrangePieces, defaultPieces, setEvaluatedPiece, getCorrespondingPieces} from '../actions/index';
import {_} from 'lodash';
import PropTypes from 'prop-types';
import createRef from 'create-react-ref/lib/createRef';

class PossibleMatches extends Component {
	constructor(props){
		super(props);

		console.log('Props: ', props);
		
		if (props.contemplatedPiece === null){
			this.props.defaultPieces();
			this.props.arrangePieces();
		}
		
		const initialState = {
				currentComponent: {whichPiece: {whichType: null, currentUpperComponent: null, currentLowerComponent: null}},
				UpperComponents: this.props.UpperComponents,
				LowerComponents: this.props.LowerComponents,
				UpperComponentEnabled: false,
				LowerComponentEnabled: false
		}

		this.state = {
			...initialState
		}	
		
		this.residingUpperComponent = createRef();
		this.residingLowerComponent = createRef();
		//Also need to this.prop.setEvaluatedPiece based off of this.props.setCurrentComponent if callback from Lower or Upper Components elapses time
		this.setNewPiece = this.setNewPiece.bind(this);
	}	

	setDefaults(){
		this.setState({currentComponent: {whichPiece: {currentUpperComponent: null, currentLowerComponent: null}}});
	}

	// static getDerivedStateFromProps(nextProps, prevState){
		
	// }


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
		const { currentUpperComponent, currentLowerComponent } = this.state.currentComponent.whichPiece;

		if (whichTypeTho === 'match'){
			if (this.state.UpperComponentEnabled){
				this.setDefaults();
				this.setState({currentUpperComponent: this.residingUpperComponent, whichType: whichTypeTho});
			}
			else if (this.state.LowerComponentEnabled){
				this.setDefaults();
				this.setState({currentLowerComponent: this.residingLowerComponent, whichType: whichTypeTho});
			}
		} else if (whichTypeTho === 'top' && currentLowerComponent === null){ //UpperComponentEnabled
			this.setState({currentUpperComponent: this.residingUpperComponent, whichType: whichTypeTho});
		} else if (whichTypeTho === 'bottom' && currentUpperComponent === null) { //LowerComponentEnabled
			this.setState({currentLowerComponent: this.residingLowerComponent, whichType: whichTypeTho});
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


		return(	 
	  	        <div className = 'GorClothingContainer'>
		  	        {/*<Wardrobe upperComponent={this.state.currentComponent.whichPiece.currentUpperComponent} lowerComponent={this.state.currentComponent.whichPiece.currentLowerComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />*/}
	                <div className = "PossibleMatches_Container">
					    <i className = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
				            {this.props.UpperComponents.map((topPiece) => {								
						  			return <UpperComponent key={topPiece.id} id={topPiece.id} 
					  							   switchComponent={this.switchFocus} 
					  							   setCurrentPiece = {this.setNewPiece} 
					  							   evaluatePiece={this.isOppositeComponentSuggested}
					  							   image={topPiece.image}
			    						  		   toggleToPiece = {() => {if (this.state.LowerComponentEnabled === false){this.setState({LowerComponentEnabled: true})}else{return;} this.setState({currentLowerComponent: this.props.suggestedBottoms[0]})}} 
					  							   isLowerComponentEnabled={this.state.LowerComponentEnabled}
					  							   ref={this.residingUpperComponent}
					  							   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>;
				            		})
				        	}
		            	  	{this.props.LowerComponents.map((bottomPiece) => {
				  				 	return	<LowerComponent key={bottomPiece.id} id={bottomPiece.id} 
			  									   setCurrentPiece = {this.setNewPiece} 
			  									   evaluatePiece={this.isOppositeComponentSuggested}
			  									   image={bottomPiece.image}
			  									   toggleToPiece={() => {if (this.state.UpperComponentEnabled === false){this.setState({UpperComponentEnabled: true})}else{return;} this.setState({currentUpperComponent: this.props.suggestedTops[0]})}} 			   
			  									   switchComponent={this.switchFocus}
			  									   isUpperComponentEnabled={this.state.UpperComponentEnabled}
			  									   ref={this.residingLowerComponent}
			  									   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>;						  		 					
				 					})
		        			}
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

const myPropTypes = PossibleMatches.propTypes = {
						UpperComponents: PropTypes.arrayOf(PropTypes.object),
						LowerComponents: PropTypes.arrayOf(PropTypes.object),
						extraTops: PropTypes.arrayOf(PropTypes.object),
						extraBottoms: PropTypes.arrayOf(PropTypes.object),
						standaloneTops: PropTypes.arrayOf(PropTypes.object),
						standaloneBottoms: PropTypes.arrayOf(PropTypes.object),
						contemplatedPiece: PropTypes.object,
						suggestedTops: PropTypes.arrayOf(PropTypes.object),
						suggestedBottoms: PropTypes.arrayOf(PropTypes.object)
					}

var stateProps = mapStateToProps;

PropTypes.checkPropTypes(myPropTypes, stateProps, 'prop', 'PossibleMatches');

function mapStateToProps(state){

			return {UpperComponents: state.possibleMatches.UpperComponents,
					LowerComponents: state.possibleMatches.LowerComponents,
					contemplatedPiece: state.possibleMatches.contemplated_piece,
					extraTops: state.possibleMatches.extraTops,
					extraBottoms: state.possibleMatches.extraBottoms,
					standaloneTops: state.possibleMatches.standaloneTops,
					standaloneBottoms: state.possibleMatches.standaloneBottoms,
					suggestedTops: state.possibleMatches.suggestedTops,
					suggestedBottoms: state.possibleMatches.suggestedBottoms}
}

export default connect(mapStateToProps, mapDispatchToProps)(PossibleMatches)
