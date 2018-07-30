import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wardrobe from './Wardrobe';
import UpperComponent from './UpperComponent';
import LowerComponent from './LowerComponent';
import Intro from './Intro';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {arrangePieces, defaultPieces, setEvaluatedPiece, getCorrespondingPieces} from '../actions/possible_matches_actions';
import {_} from 'lodash';
import PropTypes from 'prop-types';
import createRef from 'create-react-ref/lib/createRef';
import Loader from 'react-loader-spinner';

class PossibleMatches extends Component {
	constructor(props){
		super(props);

		let initialState = {
				currentMatch: {whichType: null, currentUpperComponent: null, currentLowerComponent: null},
				UpperComponents: this.props.UpperComponents,
				LowerComponents: this.props.LowerComponents,
				UpperComponentEnabled: false,
				LowerComponentEnabled: false,
				isFetched: false,
				isFetching: true
		}

		this.state = {
			...initialState
		}	
		
		this.residingUpperComponent = createRef();
		this.residingLowerComponent = createRef();
		//Also need to this.prop.setEvaluatedPiece based off of this.props.setCurrentComponent if callback from Lower or Upper Components elapses time
		this.setNewPiece = this.setNewPiece.bind(this);

		this.renderDecision = this.renderDecision.bind(this);
	}	

	static childContextTypes = {
		currentUpperComponent: PropTypes.object,
		currentLowerComponent: PropTypes.object,
		whichType: PropTypes.string
	}

	getChildContext(){
		const { currentLowerComponent, currentUpperComponent, whichType} = this.state.currentMatch;
		return { currentUpperComponent: currentUpperComponent, currentLowerComponent: currentLowerComponent, whichType: whichType };
	}


	setDefaults(){
		this.setState({currentMatch: {currentUpperComponent: null, currentLowerComponent: null}});
	}


 	async componentDidMount(){
 		
		const { defaultPieces, arrangePieces, UpperComponents, contemplated_piece, suggestedBottoms, suggestedTops} = this.props;

		try {
			function summon(){ 
				defaultPieces();
				arrangePieces();
			}
			await summon();
			
		} catch(error){
			throw Error(error);
		}

		if (contemplated_piece !== undefined && contemplated_piece !== null){
			 if (contemplated_piece.merch_type === 'top'){
				this.setState({isFetched: true, isFetching: false, currentUpperComponent: contemplated_piece, currentLowerComponent: suggestedBottoms[0]});
			 }
			 else if (contemplated_piece.merch_type === 'bottom'){
			 	this.setState({isFetched: true, isFetching: false, currentLowerComponent: contemplated_piece, currentUpperComponent: suggestedTops[0]});
			 }
		}
		else if (UpperComponents.length === 0){
			return;
		}
	}

	isOppositeComponentSuggested(whichComponent){
		var match = false;

		const { setEvaluatedPiece, getCorrespondingPieces, contemplated_piece, suggestedBottoms, suggestedTops} = this.props;
		const { currentMatch } = this.state;
		
		_.debounce((whichComponent) => {
			setEvaluatedPiece(whichComponent).then(function(){
				getCorrespondingPieces();
				if (contemplated_piece.merch_type === 'top'){
					suggestedBottoms.forEach((bottom) => {
						if (currentMatch.currentLowerComponent === bottom){
						    match = true;
						    return match;
						}
						else { 
							return match;
						}
					});
				}
				else if (contemplated_piece.merch_type === 'bottom'){
					suggestedTops.forEach((top) => {
						if (currentMatch.currentUpperComponent === top){
							match = false;
							return match;
						}				
						else {
							return match;
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
		
		const { LowerComponentEnabled, UpperComponentEnabled, isFetching, isFetched } = this.state;
		const { suggestedBottoms, suggestedTops, UpperComponents, LowerComponents, registered} = this.props;
		const { whichType } = this.state.currentMatch;

		if (isFetching){
        	 return (<div className='Loader'>
  	      			 	<Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
  	      		 	 </div>);
        } else if (isFetched){
           	    return (

           	    	<div className = "PossibleMatches_Container">
					       <i className = 'captureOutfit' onClick = {this.snapshotMatch}></i> 
				           <TransitionGroup component = {PossibleMatches}>
					            {UpperComponents.map((component) => {								
							  			return (<UpperComponent key={component.created_at} id={component.id} 
					  							   switchComponent={this.switchFocus} 
					  							   setCurrentPiece={this.setNewPiece}
					  							   registered={registered}
					  							   evaluatePiece={this.isOppositeComponentSuggested}
					  							   image={component.image}
			    						  	       toggleToPiece = {() => {if (LowerComponentEnabled === false){this.setState({LowerComponentEnabled: true})} else return; this.setState({currentLowerComponent: suggestedBottoms[0]})}}
					  							   isLowerComponentEnabled = {LowerComponentEnabled}
					  							   ref = {this.residingUpperComponent}
					  							   className = {whichType === 'match' ? 'PossibleMatches_Container' : whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>
					  							)
					            		})
					        	}
				        	</TransitionGroup>
				        	<TransitionGroup component = {PossibleMatches}>
			            	  	{LowerComponents.map((component) => {
				  				 	return  (<LowerComponent key={component.created_at} id={component.id} 
		  									   setCurrentPiece = {this.setNewPiece} 
		  									   evaluatePiece={this.isOppositeComponentSuggested}
		  									   image={component.image}
		  									   toggleToPiece = {() => {if (UpperComponentEnabled === false){this.setState({UpperComponentEnabled: true})} else return; this.setState({currentUpperComponent: suggestedTops[0]})}} 			   
		  									   switchComponent = {this.switchFocus}
		  									   isUpperComponentEnabled = {UpperComponentEnabled}
		  									   ref = {this.residingLowerComponent}
		  									   className = {whichType === 'match' ? 'PossibleMatches_Container' : whichType === 'bottom' ? 'standalonePiece' : 'standalonePiece'}/>)						  		 					
			
		        					})
			            	  }
		        			</TransitionGroup>
       				</div>
       			)
       	}
	}

	render(){

		const {currentUpperComponent, currentLowerComponent} = this.state.currentMatch;
		const { loggedIn } = this.props; 

		return(	 
	  	        <div className = 'GorClothingContainer'>
	  	          <Wardrobe upperComponent={currentUpperComponent} lowerComponent={currentLowerComponent} enableCapture={(snapshot) => this.snapshotMatch = snapshot} />
		          {this.renderDecision()}
		          {!loggedIn && (<Intro/>)}
		        </div>
		);
	}
}



PossibleMatches.contextTypes = {
	store: PropTypes.object
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
						suggestedBottoms: PropTypes.arrayOf(PropTypes.object),
						defaultPieces: PropTypes.func,
						arrangePieces: PropTypes.func,
						setEvaluatedPiece: PropTypes.func,
						getCorrespondingPieces: PropTypes.func
					}

var stateProps = mapStateToProps;

PropTypes.checkPropTypes(myPropTypes, stateProps, 'prop', 'PossibleMatches');

function mapStateToProps(state){
			const { UpperComponents, LowerComponents, contemplated_piece, extraTops, extraBottoms, standaloneBottoms, standaloneTops, suggestedBottoms, suggestedTops } = state.possibleMatches;
			const { registering, registered } = state.registration;
			return {UpperComponents, LowerComponents, contemplated_piece, extraTops, extraBottoms, standaloneBottoms, standaloneTops, suggestedBottoms, suggestedTops, registered, registering };
}

export default connect(mapStateToProps, {defaultPieces, arrangePieces, getCorrespondingPieces, setEvaluatedPiece})(PossibleMatches)
