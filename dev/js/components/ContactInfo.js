import React, { Component } from 'react';
import { actions, Form, Control, Errors } from 'react-redux-form';
import PasswordConfirmation from './PasswordConfirmation';
import {TweenMax} from 'gsap';

class ContactInfo extends React.Component{
	
	constructor(props){
		super(props);
	}

	handleSubmit(user){
		const {dispatch} = this.props;
		
		let userPromise = fetch('/ContactInfo', {
			method: "POST",
			body: JSON.stringify({email: user.email,
					      password: user.password,
					      passwordConfirmation: user.passwordConfirmation})
		}).then((response) => {
			dispatch(actions.change(user.email, response.body.email));
			dispatch(actions.change(user.password, response.body.password));
		});
	}
	
	render(){
	
			
		const validateEmail = ({email}) => {
		      var VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i;
		      return VALID_EMAIL_REGEX.test(email);	
		}


		const onSubmitFailed = () => {
		 	var emailText = document.getElementsByClassName('emailText').value;
		 	var passwordText = document.getElementsByClassName('passwordText').value;
		 		
		 	if (!passwordText || passwordText.length < 6){
		 		document.getElementsByClassName('passwordErrors').innerHtml = passwordText + ' is not valid. Need at least six characters.';
		 	} else if (!emailText || emailText.length > 255 || !validateEmail(emailText)){
		 		document.getElementsByClassName('emailErrors').innerHtml = emailText + ' is not valid.';
		 	} else {
		 		return;
		 	}
		}		
		
		return (
			
			<div className = 'ContactInfo'>
			<Form id = "contactInfo" model = "basicUserInfo" onSubmit = {(user) => this.handleSubmit(user)} validators = {{'': onSubmitFailed()}}>
				<div className = "field">
					<label> Email: </label>
					<Control.text model = ".email"
					      className = "emailText"
					      placeholder = "Email"
					      required
					      validators = {{maxLength: (val) => val && val.length < 255 }}
					      validateOn = "blur"/>
					   <div className='errors'>
					 	<span className='emailErrors'>
						</span>
					   </div>
			    </div>
				<div className = "field">	
					<label> Password: </label>
					<Control.text model = ".password"
						      placeholder = "Password"
						      className = 'passwordText'
						      required
						      validators = {{ maxLength: (val) => val && val.length > 6}}
						      validateOn = "blur"/>
					<div className='errors'>
					    <span className='passwordErrors'>
				        </span>
				    </div>		
			    </div>
				<button type = "submit">
				 	Submit
				</button>
			</Form>
			<PasswordConfirmation password = {document.getElementsByClassName('passwordText').value} />
			</div>				
		)
	}
}

export default ContactInfo
