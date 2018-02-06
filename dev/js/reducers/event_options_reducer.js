const IMMEDIATE_EVENTS = {...state, action.payload.data}
const SPORTING_EVENTS = {...state, action.payload.data}

export default function(state = {IMMEDIATE_EVENTS, SPORTING_EVENTS}, action){
	switch(action.type){
		case EVENTS_BY_TEAM:
			return{...state, team_events: action.payload.data}
		case EVENTS_BY_ARTIST:
			return {...state, artists_events: action.payload.data}
		case SEARCH_TERM: 
			return {...state, queried_events: action.payload.data}
		default: 
			return state;
	}
}
