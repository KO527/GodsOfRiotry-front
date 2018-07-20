import React, { Component } from 'react';
import EventQueries from './EventQueries';
import _ from 'lodash';

class EventSearchBar extends Component{

	constructor(props){
		super(props);
		this.state = {
			q: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
	}
	
	onInputChange(term){
		var value = term;
		if (value.includes(' ')){
			value.toString();
			value.replace(' ', '+');
		}
		this.setState({q: value});
	}

	render(){

		let { q } = this.state;

		return(
			<div className='queryContainer'>
				<form className='EventSearch'>
					<span className="EventSearch-container">
						<input onChange={_.debounce((term) => {this.onInputChange(term)}), 400} type="text" name="Search" value={q}></input>
					</span>
				</form>
				<EventQueries query={q} />
			</div>
		)
	}
}



export default EventSearchBar;