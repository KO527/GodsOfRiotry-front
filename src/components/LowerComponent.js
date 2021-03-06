import { keydownScoped } from 'react-keydown';
import React, {Component} from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {TweenMax} from 'gsap';
import ReactInterval from 'react-interval';

class LowerComponent extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	    	piece: this.refs.suggestedBottoms[0],
			enabled: true,
			timeout: 5000
	    };

		if (this.props.suggestedTops){
			this.refs.residingLowerComponent.current.piece = this.props.contemplatedPiece;
		}

	}

        
	@keydownScoped(37, 38, 39)
       
	componentWillEnter(event, callback){
                if (document.activeElement === this){
                        var piece = this.indexOf(this.props.LowerComponents);

                        if (event.which === 37){
                              piece--;
                              if (piece < 0){
							  	piece = this.props.LowerComponents.length - 1;
							  }
							  TweenMax.fromTo(this.props.LowerComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: this.centerPiece(piece)});
			      			  this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which === 39){
                        	  piece++;
                              if (piece > this.props.LowerComponents.length - 1){
                              	piece = 0;
                              }
                              TweenMax.fromTo(this.props.LowerComponents[piece], 0.3, {x: 250, opacity: 1}, {x: 0, opacity: 0, onComplete: this.centerPiece(piece)});
		              		  this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which === 38){
						      this.props.switchComponent();
						      this.setState({enabled: false});
						}
						else{
			                return;
						}
                }
                else {
                    return;
                }
    }

		
	componentWillLeave(event, callback){
		var piece = this;
		if (document.activeElement === this){
			if (event.which === 37){
				TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: 250, opacity: 0, onComplete: callback})
			}
			else if (event.which === 39){
				TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: -250, opacity: 0, onComplete: callback})
			}
			else {
			   return;
			}
		}
		else {
			return;
		}
	}


	centerPiece(i){
		 this.residingLowerComponent.current.focus();
    	 if (this.residingUpperComponent && this.residingLowerComponent){
    	 	this.props.setCurrentPiece(i, 'match');
    	 }
    	 else if (this.residingUpperComponent && this.residingLowerComponent == null){
    	 	this.props.setCurrentPiece(i, 'top');
    	 }
    	 else if (this.residingLowerComponent && this.residingUpperComponent == null){
    	 	this.props.setCurrentPiece(i, 'bottom');
    	 }
    	 else {
    		return;	
    	 }
    }	

	render(){
	
		const {timeout, enabled} = this.state;		
		return(
		  	<div>
		  		<ReactInterval{...[timeout, enabled]} callback={()=>{ var curr=this.state.currentLowerComponent;
                                var i=curr.indexOf(this.props.LowerComponents);
                                var j = i;
			        			i++;
                                TweenMax.fromTo(this.props.LowerComponents[j], 0.3, {x: 0, opacity: 1}, {x: -250, opacity: 0});
			        			TweenMax.fromTo(this.props.LowerComponents[i], 0.2, {x: 250, opacity: 0}, {x: 0, opacity: 1}); //onComplete: callback
			        		}}/> 
		   
			   <TransitionGroup>
		             <div className='LowerComponent'>
						{this.props.image}
						{this.props.description}
						{this.props.price}	  
		             </div>
			  </TransitionGroup> 
		  </div>
	
		)
	}

}

export default LowerComponent;


