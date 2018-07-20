import React, { Component } from 'react';
import { actions, Control, Form } from 'react-redux-form';
import {TweenMax} from 'gsap';
import ReactTimeout from 'react-timeout';

class PasswordConfirmation extends Component{

	handleSubmit(user){
		const {dispatch} = this.props;
		
		let userPromise = fetch('/ContactInfo', {
			method: "POST",
			body: JSON.stringify({passwordConfirmation: user.passwordConfirmation})
		})
		.then((resp) => resp.json())
		.then(resp) => {
			return resp;	
		});
	
		dispatch(actions.change('Intro.ContactInfo', userPromise));
		dispatch(actions.submit('Intro'));
	}

	render(){
	
		const PasswordMismatch = () => {
			
			var ConfirmationPassword = document.getElementsByClassName('confirmationPassword').value;
 			var PasswordConfirmationForm = document.getElementById('passwordConfirmationInfo');

			if (this.props.password !== ConfirmationPassword){
				document.getElementsByClassName('passwordConfirmationErrors').innerHtml = ConfirmationPassword + ' did not match password';		
				this.props.setTimeout(TweenMax.fromTo(PasswordConfirmationForm, 1.5, {y: 0, opacity: 1}, {y: 160, opacity: 1}), 4000);
				//Render the parent component ContactInfo
			}else{
				return;
			}	
		}	
	
		return(
			<Form id = 'passwordConfirmationInfo' model = "Intro.ContactInfo" onSubmit= {(user) => this.handleSubmit(user)} validators = {{'': PasswordMismatch()}}>
			 	<div className = "field">
					<label> Password Confirmation: </label>
					<Control.text model = ".passwordConfirmation"
						      className = "confirmationPassword"
						      placeholder = "Password"
						      required
						      validateOn = "blur"/>
				</div>
				<div className = "Errors">
				  <span className = 'passwordConfirmationErrors'>
				  </span>
				</div>
				<button type = "submit">
				  Submit
				</button>
			</Form>
		)
	}

}

export default ReactTimeout(PasswordConfirmation)
