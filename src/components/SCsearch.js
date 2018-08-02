import React, { Component } from 'react';
import {querySC} from '../actions/track_search_actions';
import { connect } from 'react-redux';
import { Form, Control, actions, Errors } from 'react-redux-form';
import checkQueryValidty from '../services/checkQueryValidity';

class SoundCloudExp extends Component {
	constructor(){
		super();
		
		this.state = {

		}

		this.handleSubmit.bind(this);
		this.renderTracks.bind(this);
	}

	shouldComponentUpdate(nextProps){

		const {SCqueries} = this.props;

		if (nextProps.SCqueries !== SCqueries){
			let markup = this.renderTracks();
			document.getElementsById('audioHere').innerHtml = markup;
		}
	}



	handleSubmit(query){

		const {querySC, dispatch} = this.props;

		let SCPromise = fetch('/SoundCloud', {
			method: 'post',
			body: query
		})
		.then((res) => res.json())
		.then((res) => {
			dispatch(actions.submit('SoundCloud', checkQueryValidty(res)));			
		});
	}

	renderTracks() {
		const {SCqueries} = this.props;

		return (
			SCqueries.map((track) => {
				<div className='box'>
		 			<div src={track.stream_url}></div>
		 				<button id='albumBtn' className='albumButton'>
		 					<img id={track.id} src={track.artwork_url}></img>
		 				</button>
		 			<div id='songTitle' className='title'>{track.title}</div>
		 		</div>
		 	})
		)		 
 	}

	render(){

		return (
			<div className= 'SCsearch-container'>
				<Form id='SC-search' model="SoundCloud" onSubmit={(query) => this.handleSubmit(query)}>
					<div className='search-bar'>
						<Control.text model=".input"
									  className='search'
									  placeholder='Search'/>
						<Errors model="SoundCloud.input"
								messages={{NoSearchResults: 'This query returned no results.'}}/>
					</div>
					<Control.button className='search-btn'>
						Search
					</Control.button>
				</Form>
				<section id='audioHere'></section>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		SCqueries: state.soundcloud.queries
	}
}

export default connect(mapStateToProps, {querySC})(SoundCloudExp);