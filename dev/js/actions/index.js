import SC from 'soundcloud';

const API_URL = "http://localhost:5000/api/v1";
const SEAT_GEEK_API = "https://api.seatgeek.com";

export const IMMEDIATE_EVENTS = 'IMMEDIATE_EVENTS', SPORTING_EVENTS = 'SPORTING_EVENTS', SEARCH_TERM = 'SEARCH_TERM', EVENTS_BY_ARTIST = 'EVENTS_BY_ARTIST', EVENTS_BY_TEAM = 'EVENTS_BY_TEAM'
export const INITIAL_PIECES = 'INITIAL_PIECES', SET_CONTEMPLATED_PIECE = 'SET_CONTEMPLATED_PIECE'

export function auth() {
  return function (dispatch) {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      dispatch(getInitialPlaylist());
    });
  };
};

function fetchMe(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMe(data));
      });
  };
}

function getInitialPlaylist(session){
	return function(dispatch){
		fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setTracks(data.collection));
		});
	}
};

export function setMe(user) {
  return {
    type: ME_SET,
    user
  };
}

export function setTracks(tracks){
	return {
		type: TRACKS_SET,
		tracks
	};
};

export function ParseEventsByArtist(artist, curr_date, event_forecast){
	const request = axios.get('${SEAT_GEEK_API}/2/events', params: {q: artist, datetime_local: {gte: curr_date}, datetime_local: {lte: event_forecast}});

	return {
		type: EVENTS_BY_ARTIST,
		payload: request["events"]
	}
}

export function ParseEventsByTeam(team, curr_date, event_forecast){
	const request = axios.get('${SEAT_GEEK_API}/2/events', params: {q: team, datetime_local: {gte: curr_date}, datetime_local: {lte: event_forecast}, geoip: 100});

	return {
		type: EVENTS_BY_TEAM,
		payload: request["events"]
	}
}

export function GiveMeImmEvents(curr_date, event_forecast){
	const request = axios.get('{SEAT_GEEK_API}/2/events', params: {genres: {slug: pop}, sort: {datetime_order: datetime_local.asc, score_order: score.desc}, taxonomies: {name: concert}, score: {gte: 0.7}, datetime_local: {gte: curr_date}, datetime_local: {lte: event_forecast}, geoip: 100});

	return {
		type: IMMEDIATE_EVENTS,
		payload: request["events"]
	}
}

export function ParseSportingEvents(curr_date, event_forecast){
	const request = axios.get('{SEAT_GEEK_API}/2/events', params: {genres: {slug: pop}, sort: {datetime_order: datetime_local.asc, score_order: score_desc}, taxonomies: {name: concert}, score: {gte: 0.7}, datetime_local: {gte: event_forecast}, datetime_local: {lte: event_forecast}, geoip: 100});
	
	return {
		type: SPORTING_EVENTS,
		payload: request["events"]
	}
}

export function queryEvent(term){
	const request = axios.get('{SEAT_GEEK_API}/2/events', params: {q: term});
	
	return {
		type: SEARCH_TERM,
		payload: request["events"]
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
	const request = axios.post('${API_URL}/visibleGorClothing/${visible_gor_clothing_id}/${contemplated_piece_id}');

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

export function EstablishBasicInfo(firstName, lastName, gender, contactInfo){
	const request = axios.post('${API_URL}/users/basic_info_params/${firstName, lastName, gender, contactInfo}')

	return (
		type: ESTABLISH_BASIC_INFO,
		payload: request
	)
}

export function EstablishGender(){
	const request = axios.post('${API_URL}/users/gender_params');

	return (
		type: ESTABLISH_GENDER,
		payload: request
	)
}

export function EstablishContactInfo(){
	
	const request = axios.post('${API_URL}/users/contact_info_params');

	return (
		type: CONTACT_INFO,
		payload: request
	)
}

export function ReturnUser(){
	const request = axios.get('${API_URL}/users/show');

	return (
		type: SHOW_USER,
		payload: request
	)
}


