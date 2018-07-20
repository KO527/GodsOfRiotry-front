
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
import {combineReducers} from 'redux';
import { combineForms, formReducer } from 'react-redux-form';
import PlaylistReducer from './playlist_reducer';
import eventTicketReducer from './event_options_reducer';
import PossibleMatchesReducer from './possible_matches_reducer';
import RegistrationReducer from './registration_reducer';
import {routerReducer} from 'react-router-redux';
import {authentication} from 'authenticationReducer';

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

const allReducers = combineReducers({
 Playlist: PlaylistReducer,
 eventOptions: eventTicketReducer,
 authentication: authenticationReducer,
 registration: RegistrationReducer,
 possibleMatches: PossibleMatchesReducer,
 Intro: combineForms({
        basicUserInfo: BasicUserInfoState,
        GenderInfo: GenderInfoState,
        ContactInfo: ContactInfoState
       }, 'Intro'),
 routing: routerReducer,
 form: formReducer
});


export default allReducers;
 