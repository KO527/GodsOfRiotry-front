class PossibleMatches extends React.Component{
	constructor(){
		this.props.getInitialPieces();
		this.state = {
		    if (this.props.contemplatedPiece.merch_type == 'top'){
		        currentLowerComponent: this.props.suggestedBottoms[0],
  			currentUpperComponent: this.props.contemplatedPiece,
			LowerComponents, UpperComponents: this.props.organizePieces();
		    }
	            else if (this.props.contemplatedPiece.merch_type == 'bottom'){
			currentLowerComponent: this.props.contemplatedPiece,
			currentUpperComponent: this.props.suggestedTops[0],
			UpperComponents, LowerComponents: this.props.organizePieces();
		    }
			currentComponent: {whichComponent: null, whichPiece: null}
			UpperComponentEnabled: false,
			LowerComponentEnabled: false
		};
	}

	addtoArray(arraylist, declaredArray){
		for(i=0; i < arraylist, i++){
			declaredArray += arraylist[i];
		}
	}

	
	isOppositeComponentSuggested(whichComponent){
		var match = false;
		_.debounce((whichComponent) => {
			this.props.setContemplatedPiece(whichComponent).then(function(){
				this.props.getAncillaryPieces();
				if (this.props.contemplatedPiece.merch_type == 'top'){
					this.props.suggestedBottoms.map((bottom) => {
						if (this.state.currentLowerComponent == bottom){
						        match = true;
						}
					});
				}
				else if (this.props.contemplatedPiece.merch_type == 'bottom'){
					this.props.suggestedTops.map((top) => {
						if (this.state.currentUpperComponent == top){
							match = true;
						}				
					});
				}
			});
		}, 6000);
	
		return match;
	}
	
	switchFocus(){
		if (this.state.currentUpperComponent.hasFocus()){
		 	this.currentLowerComponent.focus();
		}
		else if(this.state.currentLowerComponent.hasFocus())		
			this.currentUpperComponent.focus();	
		}
		else 
		  break;
	}

	render(){
		 return(
		       <Wardrobe upperComponent={this.state.currentUpperComponent} lowerComponent={this.state.currentLowerComponent} currentComponent = {this.state.currentComponent} />
	               <div className = "PossibleMatches_Container">
		            {UpperComponents.map(function(topPiece){  
				  <UpperComponent key={topPiece.id} id={topPiece.id} ref={(piece)=>{this.setState({currentUpperComponent: piece})}} setCurrentComponent = {(piece) => this.setState(currentComponent.whichPiece: piece, whichComponent: 'u', lowerComponent: null, upperComponent: null)}  toggleToPiece={this.setState({currentLowerComponent: this.props.suggestedBottoms[0]}).then(function(){if (this.state.LowerComponentEnabled: false){this.setState(LowerComponentEnabled: true)}else{break;}})} image={topPiece.image} isLowerComponentEnabled={this.state.LowerComponentEnabled} switchComponent={this.switchFocus} evaluatePiece={isOppositeComponentSuggested} className={if (this.state.currentComponent.whichComponent == 'l'){'standalonePiece'}else if(this.state.currentComponent.whichComponent == 'l'){'PossibleMatchCollapse'} else{'UpperComponent_Container'}}/>
			        });}>
		        	{LowerComponents.map(function(bottomPiece){
				  <LowerComponent key={bottomPiece.id} id={bottomPiece.id} ref={(piece)=>{this.setState({currentLowerComponent: piece})}} setCurrentComponent = {(piece) => this.setState(currentComponent.whichPiece: piece, currentComponent.whichComponent: 'l', upperComponent: null, lowerComponent: null);}  toggleToPiece={this.setState({currentUpperComponent: this.props.suggestedTops[0]}).then(function(){if(this.state.UpperComponentEnabled: false){this.setState(UpperComponentEnabled: true)}})} isUpperComponentEnabled={this.state.UpperComponentEnabled} switchComponent={this.switchFocus} evaluatePiece={isOppositeComponentSuggested} className={ if (this.state.currentComponent.whichComponent == 'l'){'standalonePiece'} else if(this.state.currentComponent.whichComponent == 'u'){'PossibleMatchCollapse'} else{'LowerComponent_Container'}}>
				 });}
		       </div>
		 );
	}
}

function mapStateToProps(state){
	return {contemplatedPiece: state.possibleMatches.contemplated_piece,
		extraTops: state.possibleMatches.extraTops,
		extraBottoms: state.possibleMatches.extraBottoms,
		standaloneTops: state.possibleMatches.standaloneTops,
		standaloneBottoms: state.possibleMatches.standaloneBottoms,
		suggestedTops: state.possibleMatches.suggestedTops,
		suggestedBottoms: state.possibleMatches.suggestedBottoms,
		UpperComponents: state.possibleMatches.UpperComponents,
		LowerComponents: state.possibleMatches.LowerComponents
	};
}

export default connect(mapStateToProps, {setContemplatedPiece, getInitialPieces, getAncillaryPieces, organizePieces})(PossibleMatches)
