import {arrangePieces, defaultPieces} from '../../actions/index';
import PossibleMatches from '../PossibleMatches' 
import connect from 'react-redux';

const makeClothesAppear = jest.fn(() => [{type: 'INITIAL_PIECES', payload: {}])
	
async function makeClothesAppear(store){
		isFetching = true;
		
		let state = new Promise((resolve, reject) =>{
		
			let summon = () => { defaultPieces();
				 		   	   	 arrangePieces();}
			summon();
			resolve(mapStateToProps(store));
		});
		
		await state;
		isFetched = true;
		isFetching = false;
}

export default function makeClothesAppear;

