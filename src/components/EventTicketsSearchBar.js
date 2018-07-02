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
	
	onInputChange(event){
		if (event.target.value){
			var value = event.target.value;
			value.toString();
			value.replace(" ", "+");
		}
		this.setState({q: value});
	}

	render(){
		return(
			<div>
				<form onSubmit={this.onFormSubmit} className='EventSearch'>
					<span className="EventSearch-btn-container">
						<input onChange={_.debounce((term) => {this.onInputChange(term)}), 300} type="text" name="Search" value={this.state.value}></input>
						<button type="submit" className="EventSearch-btn">
							Search
						</button>
					</span>
				</form>
				<EventQueries query={this.state.q} />
			</div>
		)
	}
}



export default EventSearchBar;