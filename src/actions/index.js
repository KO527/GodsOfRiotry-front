import {SHOW_USERS} from './types';
import SC from 'soundcloud';
import axios from 'axios';
import {MYCLIENTID} from '../constants/auth';
import { authHeader } from '../helpers/auth-header';

export function ReturnUsers(email, password){

    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
    };
 
    axios.get(`${API_URL}/users`, requestOptions)
        .then(handleResponse)
        .then(users => {
            localStorage.setItem('users', users);
 
        	return {type: SHOW_USERS,
                	payload: users}
        });
}

export function logout(){
	localStorage.removeItem('user');
}


export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
 
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}


