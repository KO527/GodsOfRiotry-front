import { EVENTS_BY_TEAM, EVENTS_BY_ARTIST, SEARCH_TERM, IMMEDIATE_EVENTS, SPECIFIC_EVENTS, SPORTING_EVENTS } from '../constants/types';

const initialState = {
	imm_events: [],
	team_events: [],
	artist_events: [],
	queried_events: []
}

export default function(state = initialState, action){
	switch(action.type){
		case IMMEDIATE_EVENTS:
			return {...state, imm_events: action.payload}
		case SPORTING_EVENTS:
			return {...state, team_events: action.payload}
		case SPECIFIC_EVENTS:
			return {...state, specific_team_events: action.payload}
		case EVENTS_BY_ARTIST:
			return {...state, artist_events: action.payload}
		case SEARCH_TERM: 
			return {...state, queried_events: action.payload.events}
		default: 
			return state;
	}
}
