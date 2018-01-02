const INITIAL_PIECES = {contemplated_piece: action.payload.data.contemplated_piece,
			extraTops: action.payload.data.extra_tops,
			extraBottoms: action.payload.data.extra_bottoms,
			standaloneTops: action.payload.data.standalone_tops,
			standaloneBottoms: action.payload.data.standalone_bottoms,
			suggestedTops: action.payload.data.suggested_tops,
			suggestedBottoms: action.payload.data.suggested_bottoms
			}

export default function(state = INITIAL_STATE, action){
	
	switch(action.type){
		case GET_ANCILLARY_PIECES:
		   return {...state, contemplated_piece: action.payload.data.contemplated_piece,
                          extraTops: action.payload.data.extra_tops,
                          extraBottoms: action.payload.data.extra_bottoms,
                          standaloneTops: action.payload.data.standalone_tops,
                          standaloneBottoms: action.payload.data.standalone_bottoms,
                          suggestedTops: action.payload.data.suggested_tops,
                          suggestedBottoms: action.payload.data.suggested_bottoms}
		case ORGANIZE_PIECES:
		   return {...state, UpperComponents: action.payload.data.UpperComponents,
				     LowerComponents: action.payload.data.LowerComponents	     
			}
		case SET_CONTEMPLATED_PIECE:
		   return {...state, contemplated_piece: action.payload.data.contemplated_piece}
		default:
			return state;
	}
}




