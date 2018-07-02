import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {mapStateToProps} from '../PossibleMatches';
import * as PossibleMatches from '../PossibleMatches';
import { connect } from 'react-redux';
import {arrangePieces, defaultPieces} from '../../actions/index';
import { Provider } from 'react-redux';

jest.mock('../__mocks__/retrieveClothesReq');
jest.mock('../PossibleMatches');
jest.mock('Provider');

const PossibleMatches = require('../PossibleMatches');

PossibleMatches.contextTypes = {
	store: PropTypes.object
}

const mockStore = configureMockStore;

beforeAll(() => {
	connect({arrangePieces, defaultPieces})(PossibleMatches);
});


describe("Possible Matches Component", ()=>{
	
	const retrieve = require('../__mocks__/retrieveClothesReq');

	const store = mockStore({config: {payload: ''}});
	const stateRef = store.getState()
	
	const expectedActions = [{type: 'INITIAL_PIECES', payload: {contemplated_piece: {id: 6, created_at: "2018-06-09T04:57:05.392Z", updated_at: "2018-06-09T04:57:05.392Z", price: 0, description: "Too Fresh. Like Fresh Prince of Bel-Air Fresh. Okay, lemme stop."}}}, 
							 {type: 'ORGANIZE_PIECES', payload: {UpperComponents: {id: 4, created_at: "2018-06-09T04:57:05.334Z", updated_at: "2018-06-09T04:57:05.334Z", price: 0, description: "To a baseball game, to a concert, to a get-together, this has casual written all over it."}}}]

	it("should be able to return pieces in default and arranged order", async () => {
		expect.assertions(1);
		return (
			store.dispatch(retrieve.makeClothesAppear(stateRef).then(() => expect(store.getActions()).toContainEqual(expectedActions);
		)
	});
});