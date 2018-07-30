import {ME_SET, TRACKS_SET} from '../constants/types';

const initialState = {
	SC_USER: null,
	tracks: [],
	activeTrack: null
};

export default function(state = initialState, action){
	switch(action.type){
		case ME_SET:
			return {state, SC_USER: action.payload.data};
		case TRACKS_SET:
			return {state, tracks: action.payload.data};
		default:
			return state;
	}
}

// function setMe(state, action){
// 	const { user } = action;
// 	return { ...state, user };
// }

// function setTracks(state, action){
// 	const {tracks} = action;
// 	return { ...state, tracks };
// }