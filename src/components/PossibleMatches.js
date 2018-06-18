import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import {arrangePieces, defaultPieces, setEvaluatedPiece, getCorrespondingPieces} from '../actions/index';
import {_} from 'lodash';
import PropTypes from 'prop-types';
import createRef from 'create-react-ref/lib/createRef';
import ActivityIndicator from 'react-activity-indicator';

class PossibleMatches extends Component {
	constructor(props){
		super(props);

		const initialState = {
				currentComponent: {whichPiece: {whichType: null, currentUpperComponent: null, currentLowerComponent: null}},
				UpperComponents: this.props.UpperComponents,
				LowerComponents: this.props.LowerComponents,
				UpperComponentEnabled: false,
				LowerComponentEnabled: false,
		}

		this.state = {
			...initialState
		}	
		
		this.residingUpperComponent = createRef();
		this.residingLowerComponent = createRef();
		//Also need to this.prop.setEvaluatedPiece based off of this.props.setCurrentComponent if callback from Lower or Upper Components elapses time
		this.setNewPiece = this.setNewPiece.bind(this);
		this.defaultPieces = this.props.defaultPieces.bind(this);
		this.arrangePieces = this.props.arrangePieces.bind(this);

	}	

	setDefaults(){
		this.setState({currentComponent: {whichPiece: {currentUpperComponent: null, currentLowerComponent: null}}});
	}
 
 	componentDidMount(props){
 		return new Promise((resolve, reject) => {
 			let state;
 			let {defaultPieces, arrangePieces, isFetching} = this.props;
 			let makeClothesAppear = function(){
 				defaultPieces();
 				arrangePieces();
 				isFetching = true;
 			}
 			
 			makeClothesAppear();

 			resolve(state);
		}).then(function(state){
			mapStateToProps(state);
			this.props.isFetched = true
			this.props.isFetching = false;
		}).catch((error) => {
			console.log('FetchClothesError: ', error);
		})
	}
 	

	static componentWillReceiveProps(nextProps){

	 	const {currentUpperComponent, currentLowerComponent} = this.state.currentComponent.whichPiece;

	 	if (this.props.contemplatedPiece.merch_type === 'top' && nextProps.contemplatedPiece !== this.props.contemplatedPiece){
	 			this.setState({currentLowerComponent: nextProps.suggestedBottoms[0], 
	 					currentUpperComponent: nextProps.contemplatedPiece});
	 	}
		else if (this.props.contemplatedPiece.merch_type === 'bottom' && nextProps.contemplatedPiece !== this.props.contemplatedPiece){
				this.setState({currentLowerComponent: nextProps.contemplatedPiece,
					 	currentUpperComponent: nextProps.suggestedTops[0]});
		}
		else {
			return null;
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

	setNewPiece(newPiece, whichType){
		const { currentUpperComponent, currentLowerComponent } = this.state.currentComponent.whichPiece;

		if (whichType === 'match'){
			if (this.state.UpperComponentEnabled){
				this.setDefaults();
				this.setState({currentUpperComponent: this.residingUpperComponent, whichType: whichType});
			}
			else if (this.state.LowerComponentEnabled){
				this.setDefaults();
				this.setState({currentLowerComponent: this.residingLowerComponent, whichType: whichType});
			}
		} else if (whichType === 'top' && currentLowerComponent === null){ //UpperComponentEnabled
			this.setState({currentUpperComponent: this.residingUpperComponent, whichType: whichType});
		} else if (whichType === 'bottom' && currentUpperComponent === null) { //LowerComponentEnabled
			this.setState({currentLowerComponent: this.residingLowerComponent, whichType: whichType});
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
	
	renderDecision(){
		
		const {UpperComponents, LowerComponents} = this.props;
		const {currentUpperComponent, currentLowerComponent} = this.state.currentComponent.whichPiece;
		const {LowerComponentEnabled, UpperComponentEnabled} = this.state;

		if (this.props.isFetching){
        	 return (<div className='activityLoader'>
  	      			 	<ActivityIndicator number={3} duration={200} activeColor="#fff" borderWidth={2} borderColor="50%" diameter={20}/>
  	      		 	 </div>);
        } else if (this.props.isFetched){
           	    return (<div className = "PossibleMatches_Container">
					    <i className = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
				            {UpperComponents.map((component) => {								
						  			return (<UpperComponent key={component.createdAt} id={component.id} 
				  							   switchComponent={this.switchFocus} 
				  							   setCurrentPiece = {this.setNewPiece} 
				  							   evaluatePiece={this.isOppositeComponentSuggested}
				  							   image={component.image}
		    						  		   toggleToPiece = {(LowerComponentEnabled) => {if (LowerComponentEnabled === false){this.setState({LowerComponentEnabled: true})}else{return;} this.setState({currentLowerComponent: this.props.suggestedBottoms[0]})}} 
				  							   isLowerComponentEnabled={LowerComponentEnabled}
				  							   ref={this.residingUpperComponent}
				  							   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>)
				            		})
				        	}
		            	  	{LowerComponents.map((component) => {
				  				 	return	(<LowerComponent key={component.createdAt} id={component.id} 
		  									   setCurrentPiece = {this.setNewPiece} 
		  									   evaluatePiece={this.isOppositeComponentSuggested}
		  									   image={component.image}
		  									   toggleToPiece={(UpperComponentEnabled) => {if (UpperComponentEnabled === false){this.setState({UpperComponentEnabled: true})}else{return;} this.setState({currentUpperComponent: this.props.suggestedTops[0]})}} 			   
		  									   switchComponent={this.switchFocus}
		  									   isUpperComponentEnabled={UpperComponentEnabled}
		  									   ref={this.residingLowerComponent}
		  									   className = {this.state.currentComponent.whichPiece.whichType === 'match' ? 'PossibleMatches_Container' : this.state.currentComponent.whichPiece.whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>)						  		 					
				 					})
		        			}
       					</div>)
       	}
	}

	render(){

	
		return(	 

	  	        <div className = 'GorClothingContainer'>
		  	        {/*<Wardrobe upperComponent={this.state.currentComponent.whichPiece.currentUpperComponent} lowerComponent={this.state.currentComponent.whichPiece.currentLowerComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />*/}
			          {this.renderDecision()}
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
PossibleMatches.defaultProps = {
	isFetching: true,
	isFetched: false
}

const myPropTypes = PossibleMatches.propTypes = {
						isFetching: PropTypes.bool,
						isFetched: PropTypes.bool,
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
