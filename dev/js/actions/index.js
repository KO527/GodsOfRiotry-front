const API_URL = "http://localhost:5000/api/v1"

export function getInitialPlaylist(){
	
	const request = axios.get('${API_URL}/soundcloud');

	return{
	    type: INITIAL_REQUEST,
	    payload: request
	}
};



