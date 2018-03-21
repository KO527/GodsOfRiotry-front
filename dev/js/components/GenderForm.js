import React, { Component } from 'react';
import { actions, Control, Form, Errors } from 'react-redux-form';
import {TweenMax} from 'gsap';

class GenderForm extends React.Component{
	
	constructor(props){
		super(props);
	}

	handleSubmit(user){
		const {dispatch} = this.props;
		
		let userPromise = fetch('/GenderForm', {
			method: "POST",
			body: JSON.stringify({gender: user.gender})	
		}).then((response) => {
			dispatch(actions.change(user.gender, response.body.gender));
			actions.setPending('user', true);
		});		
		//functionality to hide GenderForm and display ContactInfo
	}

	render(){

		return (

			<Form id = 'GenderInfo' model = "basicUserInfo" onSubmit = {(user) => this.handleSubmit(user)}>
			<div className = "field">
				<label> Gender: </label>
				<label><Control.radio model = ".gender"
				       value = "M"
				       updateOn = "change"/>
				</label>
				<label><Control.radio model = ".gender"
				       value = "F"
				       updateOn = "change"/>
				</label>
				<Errors className = "errors"
					model = ".gender"
					show = "touched"
					messages = {{valueMissing: 'Gender is required'}}/>	
				 <button type = "submit">
                        Submit
                 </button>
			</div>
			</Form> 
	
		)
	}

}

export default GenderForm
