import keydown, {keydownScoped} from 'react-keydown';
import React, {Component} from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class LowerComponent extends React.Component{

	constructor(props){
	    super(props);
	    this.state = {
			enabled: true,
			timeout: 5000
	    };
	}
        
	@keydownScoped(37, 38, 39)
       
	componentWillEnter(event, callback){
               if (document.activeElement == this){
                        piece = this.indexOf(LowerComponents);
                        if (event.which == 37){
                              piece--;
                              TweenMax.fromTo(LowerComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
			      			  this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which == 39){
                              piece++;
                              TweenMax.fromTo(LowerComponents[piece], 0.3, {x: 250, opacity: 1}, {x: 0, opacity: 0, onComplete: callback});
		              		  this.props.evaluatePiece(this.props.id) ? this.setState({enabled: false}) : this.props.toggleToPiece();
						}
                        else if (event.which == 38){
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
		if (document.activeElement == this){
			if (event.which == 37){
				TweenMax.fromTo(piece, 0.2, {x:0, opacity: 1}, {x: 250, opacity: 0, onComplete: callback})
			}
			else if (event.which == 39){
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

	render(){
	
		const {timeout, enabled} = this.state;		

		return(
		  	<div>
		  		<ReactInterval{...[timeout, enabled]} callback={()=>{ curr=this.state.currentLowerComponent;
                                i=curr.indexOf(this.props.LowerComponents);
                                j = i;
			        			i++;
                                TweenMax.fromTo(LowerComponents[j], 0.3, {x: 0, opacity: 1}, {x: -250, opacity: 0});
			        			TweenMax.fromTo(LowerComponents[i], 0.2, {x: 250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});}}/>
		   
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

