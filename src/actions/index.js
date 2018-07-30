import SC from 'soundcloud';
import axios from 'axios';
import {MYCLIENTID} from '../constants/auth';
import { authHeader } from '../helpers/auth-header';

const API_URL = 'http://localhost:8080/api/v1';

export function logout(){
	localStorage.removeItem('user');
}


export function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
 
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}


