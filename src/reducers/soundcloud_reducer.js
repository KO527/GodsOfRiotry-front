const initialState = {queries: []}

export default function(state = initialState, action){
	switch(action.type){
		case TRACKS_RETURNED:
			return {...state, queries: action.payload.data}
		default: 
			return state;
	}
}