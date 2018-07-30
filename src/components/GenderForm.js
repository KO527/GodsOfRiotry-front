import React, { Component } from 'react';
import { actions, Control, Form, Errors } from 'react-redux-form';
// import {TweenMax} from 'gsap';

class GenderForm extends Component{

	handleSubmit(user){
		const {dispatch} = this.props;
		
		let userPromise = fetch('/GenderForm', {
			method: "POST",
			body: JSON.stringify({gender: user.gender})	
		}).then((response) => {
			dispatch(actions.change('Intro.GenderInfo', userPromise));
			dispatch(actions.setPending('Intro.GenderInfo', true));
		});		
		//functionality to hide GenderForm and display ContactInfo
	}

	render(){

		return (

			<Form id = 'GenderInfo' model = "Intro.GenderInfo" onSubmit = {(user) => this.handleSubmit(user)}>
				<div className = "field">
					<label> Gender: </label>
					<label><Control.radio model = "GenderInfo.gender"
					       value = "M"
					       updateOn = "change"/>
					</label>
					<label><Control.radio model = "GenderInfo.gender"
					       value = "F"
					       updateOn = "change"/>
					</label>
					<Errors className = "errors"
						model = ".gender"
						show = "touched"
						messages = {{valueMissing: 'Gender is required'}}/>	
					 <Control.button type = "submit">
	                      Submit
	                 </Control.button>
				</div>
			</Form> 
	
		)
	}

}

export default GenderForm