import {ME_SET, TRACKS_SET} from '../actions/index';

const initialState = {
	tracks: [],
	activeTrack: null
};

export default function(state = initialState, action){
	switch(action.type){
		case ME_SET:
			return setMe(state, SC_User: action.payload.data);
		case TRACKS_SET:
			return setTracks(state, tracks: action.payload.data);
	}
	return state;
}

function setMe(state, action){
	const { user } = action;
	return { ...state, user };
}

function setTracks(state, action){
	const {tracks} = action;
	return { ...state, tracks };
}