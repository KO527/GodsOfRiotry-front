
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PlaylistReducer from '../playlist_reducer';
import eventTicketTeducer from '../event_options_reducer';
import PossibleMatchesReducer from '../possible_matches_reducer';
 

const allReducers = combineReducers({
 form: formReducer, 
 Playlist: PlaylistReducer,
 eventOptions: eventTicketReducer,
 possibleMatches: PossibleMatchesReducer
});

export default allReducers;
