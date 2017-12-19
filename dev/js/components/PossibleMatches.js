class PossibleMatches extends React.Component{
	
	constructor(){
		
		this.state = {
			
			currentLowerComponent: null,
			currentUpperComponent: null
		};
	}

	addtoArray(arraylist, declaredArray){
		for(i=0; i < arraylist, i++){
			declaredArray += arraylist[i];
		}
	}

	return(
		<div>
		    <ReactCSSTransitionGroup contextPiece = {id => this.setState({currentUpperComponent: id})}
								transitionName = {{ enterRight: 'enterRight',
								enterRightActive: 'enterRightActive',
								leaveRight: 'leaveRight',
								leaveRightActive: 'leaveRightActive',
								enterLeft: 'enterLeft',
								enterLeftActive: 'enterLeftActive',
								leaveLeft: 'leaveLeft',
								leaveLeftActive: 'leaveLeftActive',
								appear: 'appear',
								appearActive: 'appearActive'
							     }}>
		        {UpperComponents.map(function(topPiece){
			      return(
				<UpperComponent key={topPiece.id} contextPiece={props.contextPiece} className="topPiece_item" keydown={keydown}>
					{topPiece.image}
				</UpperComponent>
			      );
			})}
		    </ReactCSSTransitionGroup>
		    <ReactCSSTransitionGroup contextPiece = {id => this.setState({currentLowerComponent: id})}
							   transition = {{ enterRight: 'enterRight',
							   enterRightActive: 'enterRightActive',
							   leaveRight: 'leaveRight',
							   leaveRightActive: 'leaveRightActive',
							   enterLeft: 'enterLeft',
							   enterLeftActive: 'enterLeftActive',
							   leaveLeft: 'leaveLeft',
							   leaveLeftActive: 'leaveLeftActive',
							   appear: 'appear',
							   appearActive: 'appearActive'
							}}>
		     {LowerComponents.map(function(bottomPiece){
			return(
			  <LowerComponent key={bottomPiece.id} contextPiece={props.contextPiece} className="bottomPiece_item" keydown={keydown}>
				{bottomPiece.image}
			  </LowerComponent>
			);
		     })}
		   </ReactCSSTransitionGroup>
		</div>
	)
}	
