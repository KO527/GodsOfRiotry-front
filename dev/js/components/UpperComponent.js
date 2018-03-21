import keydown, { keydownScoped } from 'react-keydown';
import React, {Component} from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class UpperComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			enabled: false,
			timeout: 5000
		};
	}

	@keydownScoped(37, 39, 40)

	componentWillEnter(event, callback){
               if (document.activeElement == this){
						var piece = this.indexOf(UpperComponents);
                        if (event.which == 37){
                                piece--;
                               	this.props.makeStandalone;
								TweenMax.fromTo(UpperComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
                        		this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which == 39){
                                piece++;
                                TweenMax.fromTo(UpperComponents[piece], 0.3, {x: 250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
	                        	this.props.evalutePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
						else if (event.which == 40){
							this.props.switchComponent();
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
                var piece = this.indexOf(UpperComponents);
                if (document.activeElement == this){
                        if (event.which == 37){
                                TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: 250, opacity: 0, onComplete: callback});
						}
                        else if (event.which == 39){
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
	
	render(){

		const {enabled, timeout} = this.state;

		return(

			<div>
		       <ReactInterval {...[enabled, timeout]} callback={()=>{ curr=this.state.currentUpperComponent;
                                                                              i=curr.indexOf(this.props.UpperComponents);
                                                                              j = i;
    									      								  i++;
									      									  TweenMax.fromTo(this.props.UpperComponents[j], 0.3, {x: 0, opacity: 1}, {x: -250, opacity: 0});
									      									  TweenMax.fromTo(this.props.UpperComponents[i], 0.2, {x: 250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
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
