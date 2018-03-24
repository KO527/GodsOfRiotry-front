import {EVENTS_BY_TEAM, EVENTS_BY_ARTIST, SEARCH_TERM, IMMEDIATE_EVENTS, SPORTING_EVENTS } from '../actions/index';

export default function(state = {IMMEDIATE_EVENTS, SPORTING_EVENTS}, action){
	switch(action.type){
		case EVENTS_BY_TEAM:
			return {...state, team_events: action.payload.data}
		case EVENTS_BY_ARTIST:
			return {...state, artists_events: action.payload.data}
		case SEARCH_TERM: 
			return {...state, queried_events: action.payload.data}
		default: 
			return state;
	}
}
