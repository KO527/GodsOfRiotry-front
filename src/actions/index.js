import {ME_SET, TRACKS_SET, EVENTS_BY_TEAM, EVENTS_BY_ARTIST, SPORTING_EVENTS, INITIAL_PIECES, SET_CONTEMPLATED_PIECE, SEARCH_TERM, IMMEDIATE_EVENTS, GET_ANCILLARY_PIECES, REPLACE_INITIAL_PLAYLIST, ORGANIZE_PIECES, ESTABLISH_GENDER, ESTABLISH_BASIC_INFO, CONTACT_INFO, SHOW_USER} from './types';
import SC from 'soundcloud';
import axios from 'axios';
import {MYCLIENTID} from '../constants/auth';

const API_URL = 'http://localhost:8080/api/v1';
const SEAT_GEEK_API = "https://api.seatgeek.com";


export function ParseEventsByTeam(team, curr_date, event_forecast){
	const request = axios.get(`${SEAT_GEEK_API}/2/events`, {
		params: {
			q: team,
			client_id: MYCLIENTID, 
			datetime_local: {gte: curr_date, lte: event_forecast}, 
			geoip: 100
		}
	});

 	return {
		type: EVENTS_BY_TEAM,
		payload: request["events"]
	}
}

export function ParseEventsByArtist(artist, curr_date, event_forecast){
	const request = axios.get(`${SEAT_GEEK_API}/2/events`, {
		params: {
			performers: {slug: artist},
			taxonomies: {name: 'concert'},
			datetime_local: {gte: curr_date, lte: event_forecast},
			geoip: 100,
			client_id: MYCLIENTID
		}
	});

	return {
		type: EVENTS_BY_ARTIST,
		payload: request["events"]
	}
}


export function GiveMeImmEvents(curr_date, event_forecast){
	const request = axios.get(`${SEAT_GEEK_API}/2/events`, {
		params: {
			genres: {slug: 'pop'}, 
			sort: {datetime_order: 'datetime_local.asc', score_order: 'score.desc'}, 
			taxonomies: {name: 'concert'}, 
			score: {gte: 0.7}, 
			datetime_local: {gte: curr_date, lte: event_forecast}, 
			geoip: 100
		}
	});

	return {
		type: IMMEDIATE_EVENTS,
		payload: request["events"]
	}
}

export function ParseSportingEvents(curr_date, event_forecast){
	const request = axios.get(`${SEAT_GEEK_API}/2/events`, { 
		params: {
			genres: {slug: 'pop'}, 
			sort: {datetime_order: 'datetime_local.asc', score_order: 'score.desc'},
			taxonomies: {name: 'concert'}, 
			score: {gte: 0.7}, 
			datetime_local: {gte: event_forecast, lte: event_forecast}, 
			geoip: 100
		}
	});

	return {
		type: SPORTING_EVENTS,
		payload: request["events"]
	}
}

export function queryEvent(term){
	const request = axios.get(`${SEAT_GEEK_API}/2/events`, {
		params: {
			q: term
		}
	});

	return {
		type: SEARCH_TERM,
		payload: request["events"]
	}
}


export function defaultPieces(){
	return function(dispatch){
		fetch(`${API_URL}/possible_matches/setup_possible_matches`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
		.then((json) => {
			console.log('Json: ', json);
			dispatch(getInitialPieces(json))
		})
	}
}

export function getInitialPieces(request){
	return {
		type: INITIAL_PIECES,
		payload: request
	}
}


export function setEvaluatedPiece(contemplated_piece_id){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/${contemplated_piece_id}/visible_gor_clothing`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
        	}
        })
        .then(res => res.json())
        	.then((json) => {
          		dispatch(setContemplatedPiece(json))
        	})
  	}
}

export function setContemplatedPiece(request){
	return{ 	
		type: SET_CONTEMPLATED_PIECE,
		payload: request
	};
}

export function getCorrespondingPieces(){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/setup_possible_matches`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
			.then((json) => {
				dispatch(getAncillaryPieces(json))
			})

	}
}


export function getAncillaryPieces(request){
	return{
		type: GET_ANCILLARY_PIECES,
		payload: request
	};
}

export function arrangePieces(){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/organize_pieces`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
			.then((json) => {
				console.log('ArrangePiecesJson: ', json);
				dispatch(organizePieces(json))
			})
	}
}

export function organizePieces(request){
	return {
		type: ORGANIZE_PIECES,
		payload: request
	};
}

export function EstablishBasicInfo(firstName, lastName){
	const request = axios.post(`${API_URL}/users/basic_info_params/`, {
		params: {
			first_name: `${firstName}`,
			last_name: `${lastName}`
		}
	});

	return {
		type: ESTABLISH_BASIC_INFO,
		payload: request
	}
}

export function EstablishGender(gender){
	const request = axios.post(`${API_URL}/users/basic_info_params/`, {
		params: {
			gender: `${gender}`
		}
	});

	return {
		type: ESTABLISH_GENDER,
		payload: request
	}
}

export function EstablishContactInfo(email, password, passwordConfirmation){

	const request = axios.post(`${API_URL}/users/basic_info_params/`, {
		params: {
			email: `${email}`,
			password: `${password}`,
			passwordConfirmation: `${passwordConfirmation}`
		}
	});

	return {
		type: CONTACT_INFO,
		payload: request
	}
}

export function ReturnUser(){
	const request = axios.get(`${API_URL}/users/show`);

	return {
		type: SHOW_USER,
		payload: request
	}
}


