import axios from 'axios';
import { EVENTS_BY_ARTIST, SPECIFIC_EVENTS, IMMEDIATE_EVENTS, SPORTING_EVENTS, SEARCH_TERM } from '../constants/types';
import { MYCLIENTID } from '../constants/auth';

const SEAT_GEEK_API = "https://api.seatgeek.com";

export function ParseEventsByTeam(team, curr_date, event_forecast){
	return axios.get(`${SEAT_GEEK_API}/2/events?client_id=${MYCLIENTID}`, {
		params: {
			'q': team,
			'taxonomies.name': 'sports',
			'sort': 'datetime_local.asc', 
			'datetime_local.gte': curr_date, 
			'datetime.lte': event_forecast
		}
	}).then((resp) => {
		return {
			type: SPECIFIC_EVENTS,
			payload: resp.data.eventsr
		}
	});
}

export function ParseEventsByArtist(artist, curr_date, event_forecast){
	return axios.get(`${SEAT_GEEK_API}/2/events?client_id=${MYCLIENTID}`, {
		params: {
			'performers.slug': artist,
			'taxonomies.name': 'concert',
			'datetime_local.gte': curr_date, 
			'datetime_local.lte': event_forecast,
		}
	}).then((resp) => {
		return {
			type: EVENTS_BY_ARTIST,
			payload: resp.data.events
		}
	});
}


export function GiveMeImmEvents(curr_date, event_forecast){
	return axios.get(`${SEAT_GEEK_API}/2/events?client_id=${MYCLIENTID}`, {
		params: {
			'genres.slug': 'pop', 
			'sort': 'datetime_local.asc', 
			'taxonomies.name': 'concert', 
			'score.gte': 0.7, 
			'datetime_local.gte': curr_date, 
			'datetime_local.lte': event_forecast, 
			'geoip': 100
		}
	}).then((resp) => {console.log('Response :', resp.data.events);
						return {
							type: IMMEDIATE_EVENTS,
							payload: resp.data.events
						}						
			});	
}


export function ParseSportingEvents(curr_date, event_forecast){
		return axios.get(`${SEAT_GEEK_API}/2/events?client_id=${MYCLIENTID}`, { 
			params: {
				'sort': 'datetime_local.asc', 
				'taxonomies.name': 'sports', 
				'score.gte': 0.7,
				'datetime_local.gte': curr_date, 
				'datetime_local.lte': event_forecast
			}
		}).then((resp) => {
			console.log('Sporting Events: ', resp.data.events);
			return {
				type: SPORTING_EVENTS,
				payload: resp.data.events
			}
		});
}

export function queryEvent(term){
	return axios.get(`${SEAT_GEEK_API}/2/events?client_id=${MYCLIENTID}`, {
		params: {
			'q': term,
			'sort': 'datetime_local.asc'
		} 
	}).then((resp) => { 
	 	return {
	 	 	type: SEARCH_TERM,
	 	 	payload: resp.data.events
	 	}
	});
}
