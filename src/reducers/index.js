
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
import {combineReducers} from 'redux';
import { combineForms, formReducer, createForms } from 'react-redux-form';
import PlaylistReducer from './playlist_reducer';
import eventTicketReducer from './event_options_reducer';
import PossibleMatchesReducer from './possible_matches_reducer';
import registrationReducer from './registration_reducer';
import authenticationReducer from './authentication_reducer';
import {routerReducer} from 'react-router-redux';

const BasicUserInfoState = {
        firstName: '',
        lastName: ''
}

const ContactInfoState = {
        email: '',
        password: '',
        passwordConfirmation: ''
}

const GenderInfoState = {
        gender: ''
}

const SoundCloudState = {
    input: ''
}

const allReducers = combineReducers({
 Playlist: PlaylistReducer,
 eventOptions: eventTicketReducer,
 authentication: authenticationReducer,
 registration: registrationReducer,
 possibleMatches: PossibleMatchesReducer,
 Intro: combineForms({
        basicUserInfo: BasicUserInfoState,
        GenderInfo: GenderInfoState,
        ContactInfo: ContactInfoState
       }, 'user'),
 ...createForms({
        SoundCloud: SoundCloudState
 }),
 routing: routerReducer,
 form: formReducer
});


export default allReducers;
 