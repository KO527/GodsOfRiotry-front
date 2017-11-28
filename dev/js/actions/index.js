
var SC = require('node-soundcloud');

const API_URL = "http://localhost:5000/api/v1";

export function getPlaylist(props){
	const request = SC.get('me/playlists', props, {limit: 1});
	
	return{
		type: GET_PLAYLIST,
		payload: request
	}
}

export function getInitialPlaylist(){
	const request = axios.get('${API_URL}/soundcloud');
		
	return{
	    type: INITIAL_PLAYLIST,
	    payload: request
	}
}

