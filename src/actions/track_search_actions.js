import axios from 'axios';
import {CLIENT_ID} from '../constants/auth';
import {TRACKS_RETURNED} from '../constants/types';

const SC_API = "https://api.soundcloud.com";

export function querySC(searchResults){
	axios.get(`${SC_API}/tracks?client_id=${CLIENT_ID}`,{
		params: {
			query: searchResults
		}
	})
	.then((resp) => {
		console.log('Response: ', resp);
		return {
			type: TRACKS_RETURNED,
		 	payload: resp.tracks
		}
	});
}