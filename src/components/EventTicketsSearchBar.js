import React, { Component } from 'react';
import EventQueries from './EventQueries';

class EventSearchBar extends Component{

	constructor(props){
		super(props);
		this.state = {
			q: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
	}
	
	onInputChange(event){
		this.setState({q: event.target.value});
	}

	render(){
		return(
			<div>
				<form onSubmit={this.onFormSubmit} className='EventSearch'>
					<span className="EventSearch-btn-container">
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

export default EventSearchBar