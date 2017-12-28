class LowerComponent extends React.Component{

	constructor(props){
	    super(props);
	}
        
	@keyScoped(37, 38, 39)
       
	componentWillEnter(event, callback){
               if (document.activeElement == this){
                        id = this.props.id;
                        piece = id.indexOf(LowerComponents);
                        if (event.which == 37){
                                piece--;
                                TweenMax.fromTo(LowerComponents[piece], 0.3, {x: -250, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
                        	this.props.evaluatePiece(this.props.id);
			}
                        else if (event.which == 39){
                                piece++;
                                TweenMax.fromTo(LowerComponents[piece], 0.3, {x: 250, opacity: 1}, {x: 0, opacity: 0, onComplete: callback});
                        	this.props.evaluatePiece(this.props.id);
			}
                        else if (event.which == 38){
				this.props.switchComponent();	
			}
			else{
                                break;
			}
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
		   <div className='LowerComponent_Container'>
			{this.props.image}	  
		   </div> 
		)
	}
}
