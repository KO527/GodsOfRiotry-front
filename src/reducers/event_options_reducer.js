import { EVENTS_BY_TEAM, EVENTS_BY_ARTIST, SEARCH_TERM, IMMEDIATE_EVENTS, SPORTING_EVENTS } from '../actions/types';

const initialState = {
	imm_events: [],
	team_events: [],
	artists_events: [],
	queried_events: []
}

export default function(state = initialState, action){
	switch(action.type){
		case IMMEDIATE_EVENTS:
			return {...state, imm_events: action.payload.events}
		case SPORTING_EVENTS:
			return {...state, team_events: action.payload.events}
		case EVENTS_BY_ARTIST:
			return {...state, artists_events: action.payload.events}
		case SEARCH_TERM: 
			return {...state, queried_events: action.payload.events}
		default: 
			return state;
	}
}
