
var SC = require('node-soundcloud');

const API_URL = "http://localhost:5000/api/v1";

export function getInitialPlaylist(){
	const request = axios.get('${API_URL}/soundcloud');
		
	return{
	    type: INITIAL_PLAYLIST,
	    payload: request
	}
}

export function replaceInitialPlaylist(id){
	const request = axios.delete('${API_URL}/soundcloud/${id}');

	return {
	   type: REPLACE_INITIAL_PLAYLIST,
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


