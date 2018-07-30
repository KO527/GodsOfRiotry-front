import {INITIAL_PIECES, GET_ANCILLARY_PIECES, ORGANIZE_PIECES, SET_CONTEMPLATED_PIECE} from '../constants/types';

const initialState = {
	 UpperComponents: [],
	 LowerComponents: [],
	 contemplated_piece: null,
	 extraTops: [],
     extraBottoms: [],
     standaloneTops: [],
     standaloneBottoms: [],
     suggestedTops: [],
     suggestedBottoms: []
}
			
export default function(state = initialState, action){
	
	switch(action.type){
		case INITIAL_PIECES:
			return {...state, contemplated_piece: action.payload.contemplated_piece,
							  extraTops: action.payload.extra_tops,
	                          extraBottoms: action.payload.extra_bottoms,
	                          standaloneTops: action.payload.standalone_tops,
	                          standaloneBottoms: action.payload.standalone_bottoms,
	                          suggestedTops: action.payload.suggested_tops,
	                          suggestedBottoms: action.payload.suggested_bottoms}
		case GET_ANCILLARY_PIECES:
		   return {...state, extraTops: action.payload.extra_tops,
	                         extraBottoms: action.payload.extra_bottoms,
	                         standaloneTops: action.payload.standalone_tops,
	                         standaloneBottoms: action.payload.standalone_bottoms,
	                         suggestedTops: action.payload.suggested_tops,
	                         suggestedBottoms: action.payload.suggested_bottoms}
		case ORGANIZE_PIECES:
			   return {...state, UpperComponents: action.payload.UpperComponents,
					     		 LowerComponents: action.payload.LowerComponents}		    
		case SET_CONTEMPLATED_PIECE:
		   return {...state, contemplated_piece: action.payload.contemplated_piece}
		default:
			return state;
	}
}




