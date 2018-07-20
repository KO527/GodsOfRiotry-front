import {ESTABLISH_GENDER, ESTABLISH_BASIC_INFO, CONTACT_INFO} from './types';
import axios from 'axios';
import userConstants from '../constants';
import handleResponse from '../actions/index';
import history from '../components/App';

const API_URL = 'http://localhost:8080/api/v1';


export function EstablishNewUser(firstName, lastName, gender, email, password, passwordConfirmation){
	axios.post(`${API_URL}/users/basic_info_params/`, {
		params: {
			first_name: `${firstName}`,
			last_name: `${lastName}`,
			gender: `${gender}`,
			email: `${email}`,
			password: `${password}`,
			passwordConfirmation: `${passwordConfirmation}`
		}
	}).then(handleResponse)
	  .then(user => {
			dispatch(success());
			history.push('/PossibleMatches');
			dispatch(alertActions.success('Registration successful'));
		},
		error => {
			dispatch(failure(error.toString()));
			dispatch(alertActions.error(error.toString()));
		});
	
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
 
    return fetch(`${API_URL}/sessions/create`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
 
            return user;
        }).then(user => {
        	dispatch(success());
            history.push('/login');
        }, error => {
        	dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        });

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

export function getAll(){
	const requestOptions(){
		method: 'GET',
		headers: {...authHeader(), 'Content-Type': 'application/json'}
	};

	return fetch(`${API_URL}/users`, requestOptions).then(handleResponse)
				.then(users => {
					users => dispatch(success(users)),
					errors => dispatch(failure(error.toString()))
				});

	function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }			

}
