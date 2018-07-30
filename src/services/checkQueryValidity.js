import {actions} from 'react-redux-form';
import {querySC} from '../actions/track_search_actions';

export default function checkQueryValidty(val){
	return async (dispatch) => {
		dispatch(actions.setPending('SoundCloud.input', true));

			try {
				let response = await querySC(val);
				dispatch(actions.setValidity('SoundCloud.input', {
					queries: response.queries
				}));
			}
			catch(error){
				dispatch(actions.setErrors('SoundCloud.input', {
					NoSearchResults: error.message
				}));
			}

		dispatch(actions.setPending('SoundCloud.input', false));
	}
}

