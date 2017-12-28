class UpperComponent extends React.Component{
	constructor(){
		super(props);
	}

	keyDownScoped(37, 39, 40)

	componentWillEnter(event, callback){
               if (document.activeElement == this){
                        id = this.props.id;
                        piece = id.indexOf(UpperComponents);
                        if (event.which == 37){
                                piece--;
                                TweenMax.fromTo(UpperComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
                        	this.props.evaluatePiece(this.props.id);
			}
                        else if (event.which == 39){
                                piece++;
                                TweenMax.fromTo(UpperComponents[piece], 0.3, {x: 250, opacity: 1}, {x: 0, opacity: 0, onComplete: callback});
                        	this.props.evalutePiece(this.props.id);
			}
			else if (event.which == 40){
				this.props.switchComponent();
			}
                        else
                                break;
                }
                else
                        break;
        }

	componentWillLeave(event, callback){
                var piece = this.container;
                if (document.activeElement == this){
                        if (event.which == 37){
                                TweenMax.fromTo(piece, 0.2, {x:0, opacity: 1}, {x: 250, opacity: 0, onComplete: callback})
			}
                        else if (event.which == 39){
                                TweenMax.fromTo(piece, 0.2, {x: 0, opacity: 1}, {x: -250, opacity: 0, onComplete: callback})
                        }
                        else
                           break;
                }
                else
                        break;
        }
	
	render(){
		return(
		       <div className='UpperComponent_Container'>
		         {this.props.image}
		       </div>
		)
	}

}
