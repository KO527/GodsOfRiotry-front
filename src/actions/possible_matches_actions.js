import axios from 'axios';
import {GET_ANCILLARY_PIECES, INITIAL_PIECES, SET_CONTEMPLATED_PIECE, ORGANIZE_PIECES} from './types';

const API_URL = 'http://localhost:8080/api/v1';

export function defaultPieces(){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/setup_possible_matches`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
		.then((json) => {
			console.log('defaultPieces: ', json);
			dispatch(getInitialPieces(json))
		})
	}
}

export function getInitialPieces(request){
	return {
		type: INITIAL_PIECES,
		payload: request
	}
}


export function setEvaluatedPiece(contemplated_piece_id){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/${contemplated_piece_id}/visible_gor_clothing`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
        	}
        })
        .then(res => res.json())
        	.then((json) => {
          		dispatch(setContemplatedPiece(json))
        	})
  	}
}

export function setContemplatedPiece(request){
	return{ 	
		type: SET_CONTEMPLATED_PIECE,
		payload: request
	};
}

export function getCorrespondingPieces(){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/setup_possible_matches`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
			.then((json) => {
				dispatch(getAncillaryPieces(json))
			})

	}
}


export function getAncillaryPieces(request){
	return{
		type: GET_ANCILLARY_PIECES,
		payload: request
	};
}

export function arrangePieces(){
	return function(dispatch){
		return fetch(`${API_URL}/possible_matches/organize_pieces`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
			.then((json) => {
				console.log('ArrangePieces: ', json);
				dispatch(organizePieces(json))
			})
	}
}

export function organizePieces(request){
	return {
		type: ORGANIZE_PIECES,
		payload: request
	};
}