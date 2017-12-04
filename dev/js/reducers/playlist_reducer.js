const INITIAL_PLAYLIST = {playlist: action.payload.data};

export default function(state = INITIAL_PLAYLIST, action){
	switch(action.type){
		case REPLACE_INITIAL_PLAYLIST:
			return {...state, playlist: action.payload.data}
		default:
			return state;
	}
}
