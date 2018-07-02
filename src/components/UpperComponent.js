import { keydownScoped } from 'react-keydown';
import React, {Component} from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {TweenMax} from 'gsap';
import ReactInterval from 'react-interval';

class UpperComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			enabled: false,
			timeout: 5000
		};
	}

	@keydownScoped(37, 39, 40)

	componentWillEnter(event, callback){
                if (document.activeElement === this){
						var piece = this.indexOf(this.props.UpperComponents);

                        if (event.which === 37){
                                piece--;
                                if (piece < 0){
                                    piece = this.props.LowerComponents.length - 1;
                                }
								TweenMax.fromTo(this.props.UpperComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: this.centerPiece(piece)});
                        		this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which === 39){
                                piece++;
                                if (piece > this.props.LowerComponents.length - 1){
                                   piece = 0;
                                }
                                TweenMax.fromTo(this.props.UpperComponents[piece], 0.3, {x: 250, opacity: 0}, {x: 0, opacity: 1, onComplete: this.centerPiece(piece)});
	                        	this.props.evalutePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
						else if (event.which === 40){
							this.props.switchComponent();
							this.setState({enabled: false});
						}
			            else{
			                return;
			            }
			    }
                else{
                    return;
                }    	
    }

	componentWillLeave(event, callback){
                var piece = this.indexOf(this.props.UpperComponents);
                if (document.activeElement === this){
                        if (event.which === 37){
                                TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: 250, opacity: 0, onComplete: callback});
						}
                        else if (event.which === 39){
                                TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: -250, opacity: 0, onComplete: callback});
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
    	  
    	 this.residingUpperComponent.current.focus();
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

		const {enabled, timeout} = this.state;

		return(

			<div>
		       <ReactInterval {...[enabled, timeout]} callback={()=>{ var curr=this.refs.residingUpperComponent.current.currentUpperComponent;
                                                                              var i = curr.indexOf(this.props.UpperComponents);
                                                                              var j = i;
    									      								  i++;
									      									  TweenMax.fromTo(this.props.UpperComponents[j], 0.3, {x: 0, opacity: 1}, {x: -250, opacity: 0});
									      									  TweenMax.fromTo(this.props.UpperComponents[i], 0.2, {x: 250, opacity: 0}, {x: 0, opacity: 1}); //onComplete: callback
                                                                        }}/>
		       <TransitionGroup>
			       <div className='UpperComponent'>
			         {this.props.image}
					 {this.props.price}
					 {this.props.description}
			       </div>
			   </TransitionGroup>
			</div>
		)
	}
}

export default UpperComponent;
