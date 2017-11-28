const INITIAL_STATE = {user_preference: [], playlist: null};

export default function(state=INITIAL_STATE, action){
	switch(action.type){
		case GET_ARTICLES:
			return {...state, user_preference: action.payload.data}
		default:
			return state;
	}
}
