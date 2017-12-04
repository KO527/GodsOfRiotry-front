
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PlaylistReducer from '../playlist_reducer';

const allReducers = combineReducers({
 form: formReducer, 
 playlist: PlaylistReducer,
 eventOptions: eventTicketReducer
});

export default allReducers;
