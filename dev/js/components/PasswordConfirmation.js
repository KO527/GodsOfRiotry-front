import React, { Component } from 'react';
import { actions, Control, Form, Errors } from 'react-redux-form';

class PasswordConfirmation extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
	    	var PasswordConfirmationForm = document.getElementsById('passwordConfirmationInfo');
	}

	render(){
		
		const PasswordMismatch = () => {
			
			var ConfirmationPassword = document.getElementsByClassName('confirmationPassword').value;
 
			if (this.props.password !== ConfirmationPassword){
				document.getElementsByClassName('passwordConfirmationErrors').innerHtml = ConfirmationPassword + ' did not match password';		
				timeout(TweenMax.fromTo(PasswordConfirmationForm, 1.5, {y: 0, opacity: 1}, {y: 160, opacity: 1}), 4000);
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

export default PasswordConfirmation
