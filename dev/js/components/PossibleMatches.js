class PossibleMatches extends React.Component{
	constructor(){
		this.props.getInitialPieces();
		this.state = {
			if (this.props.contemplatedPiece.merch_type == 'top'){
			   currentLowerComponent: this.props.suggestedPieces[0],
  			   currentUpperComponent: this.props.contemplatedPiece,
			   LowerComponents, UpperComponents: this.props.organizePieces();
			}
			else{
			   currentLowerComponent: this.props.contemplatedPiece,
			   currentUpperComponent: this.props.suggestedPieces[0],
			   UpperComponents, LowerComponents: this.props.organizePieces();
			}  
		};
	}

	addtoArray(arraylist, declaredArray){
		for(i=0; i < arraylist, i++){
			declaredArray += arraylist[i];
		}
	}
	
	updatePieces(){
		var LowerComponents;
		var UpperComponents;
		
		if (contemplatedPiece.merch_type == 'bottom'){
		     this.addToArray(contemplatedPiece, LowerComponents);
		     this.addToArray(extraBottoms, LowerComponents);
		     this.addToArray(standaloneBottoms, LowerComponents);
		     this.addToArray(suggestedTops, UpperComponents);
		     this.addToArray(extraTops, UpperComponents);
		     this.addToArray(standaloneTops, UpperComponents);
		     this.setState(UpperComponents: UpperComponents, LowerComponents: LowerComponents)
		}
		else if (contemplatedPiece.merch_type == 'top'){
		     this.addToArray(contemplatedPiece, UpperComponents);
		     this.addToArray(extraTops, UpperComponents);
		     this.addToArray(standaloneTops, UpperComponents);
		     this.addToArray(suggestedBottoms, LowerComponents);
		     this.addToArray(extraBottoms, LowerComponents);
		     this.addToArray(standaloneBottoms, LowerComponents);
		     this.setState(UpperComponents: UpperComponents, LowerComponents: LowerComponents);
		}
	}
	
	isOppositeComponentSuggested(whichComponent){
		var match;
		_.debounce((whichComponent) => {
			this.props.setContemplatedPiece(whichComponent).then(function(){
				this.props.getAncillaryPieces();
				if (this.props.contemplatedPiece.merch_type == 'top'){
					this.props.suggestedBottoms.map((bottom) => {
						if (this.state.currentLowerComponent !== bottom){
						        match = false;
						}
						else{
							match = true;
						}
					});
				}
				else if (this.props.contemplatedPiece.merch_type == 'bottom'){
					this.props.suggestedTops.map((top) => {
						if (this.state.currentUpperComponent !== top){
							match = false;
						}
						else{
							match = true;
						}
					});
				}
			});
		}, 600);
	
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

	return(
		<div className='PossibleMatches_Container'>
		    {UpperComponents.map(function(topPiece){
			  return(
                              <TransitionGroupPlus>
		              <UpperComponent key={topPiece.id} id={topPiece.id} ref={(piece)=>{this.setState({currentUpperComponent: piece})} image={topPiece.image} switchComponent={this.switchFocus} evaluatePiece={isOppositeComponentSuggested} className="topPiece_item"/>
			      </TransitionGroupPlus>
			  );
		    });}
		    {LowerComponents.map(function(bottomPiece){
			return(
			 <TransitionGroupPlus>
			  <LowerComponent key={bottomPiece.id} id={bottomPiece.id} ref={(piece)=>{this.setState({currentLowerComponent: piece})}  switchComponent={this.switchFocus} evaluatePiece={isOppositeComponentSuggested} className="bottomPiece_item"/>
                         </TransitionGroupPlus>
			);
		     });}
		</div>
	)
} 

function mapStateToProps(state){
	return {contemplatedPiece: state.possibleMatches.contemplated_piece,
		extraTops: state.possibleMatches.extraTops,
		extraBottoms: state.possibleMatches.extraBottoms,
		standaloneTops: state.possibleMatches.standaloneTops,
		standaloneBottoms: state.possibleMatches.standaloneBottoms,
		suggestedTops: state.possibleMatches.suggestedTops,
		suggestedBottoms: state.possibleMatches.suggestedBottoms
	};
}

export default connect(mapStateToProps, {setContemplatedPiece, getInitialPieces, getAncillaryPieces})(PossibleMatches)
