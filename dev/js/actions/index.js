var SC = require('node-soundcloud'); 

const API_URL = "http://localhost:5000/api/v1";
const SEAT_GEEK_API = "https://api.seatgeek.com";

export function ParseEventsByArtist(artist){
	const request = axios.get('${SEAT_GEEK_API}/2/events', :query => {'q' => artist, "datetime_local.gte" => this.event_forecast, "datetime_local.lte" => this.until_eight_months});

	return {
		type: EVENTS_BY_ARTIST,
		payload: request["events"]
	}
}

export function ParseEventsByTeam(team){
	const request = axios.get('${SEAT_GEEK_API}/2/events', :query => {'q' => team, "datetime_local.gte" => this.event_forecast, "datetime_local.lte => this.until_eight_months, "geoip" => '100mi'});

	return {
		type: EVENTS_BY_TEAM,
		payload: request["events"]
	}
}

export function GiveMeImmEvents(){
	const request = axios.get('{SEAT_GEEK_API}/2/events', :query => {"genres.slug" => 'pop', "sort" => {"datetime_order" => 'datetime_local.asc', "score_order" => 'score.desc'}, "taxonomies.name" => 'concert', "score.gte" => '0.7', "datetime_local.gte" => this.event_forecast, "datetime_local.lte" => this.until_eight_months, "geoip" => '100mi'});

	return {
		type: IMMEDIATE_EVENTS,
		payload: request["events"]
	}
}

export function ParseSportingEvents(){
	const request = axios.get('{SEAT_GEEK_API}/2/events', :query => {"genres.slug" => 'pop', "sort" => {"datetime_order" => 'datetime_local.asc', "score_order" => 'score_desc'}, "taxonomies.name => 'concert', "score.gte" => '0.7', "datetime_local.gte" => this.event_forecast, "datetime_local.lte" => this.until_eight_months, "geoip" => '100mi'});
	
	return {
		type: SPORTING_EVENTS,
		payload: request["events"]
	}
}

export function queryEvent(term){
	const request = axios.get('{SEAT_GEEK_API}/2/events', :query => {"q" => term});
	
	return {
		type: SEARCH_TERM,
		payload: request["events"]
	}
}

export function getInitialPlaylist(){
	const request = axios.get('${API_URL}/playlist');
		
	return{
	    type: INITIAL_PLAYLIST,
	    payload: request
	}
}

export function replaceInitialPlaylist(id){
	const request = axios.delete('${API_URL}/playlist/${id}');

	return {
	   type: REPLACE_INITIAL_PLAYLIST,
	   payload: request
        }
}

export function getInitialPieces(){
	const request = axios.get('${API_URL}/PossibleMatches/show');
	
	return{
		type: INITIAL_PIECES,
		payload: request
	}
}

export function setContemplatedPiece(id){
	const request = axios.post('${API_URL}/visibleGorClothing/${visible_gor_clothing_id}/${contemplated_piece_id});

	return{ 	
		type: SET_CONTEMPLATED_PIECE,
		payload: request
	};
}

export function getAncillaryPieces(){
	const request = axios.get('${API_URL}/PossibleMatches/show');
	
	return{
		type: GET_ANCILLARY_PIECES,
		payload: request
	};
}

export function organizePieces(){
	const request = axios.get('${API_URL}/PossibleMatches/organize_pieces')

	return{
		type: ORGANIZE_PIECES,
		payload: request
	};
}
  
