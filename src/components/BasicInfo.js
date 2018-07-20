import React, { Component } from 'react';
import { actions, Control, Form } from 'react-redux-form';
import {TweenMax} from "gsap";

class BasicInfo extends Component{
 	  constructor(){
      super();
      
      this.handleSubmit.bind(this);
    }

	  componentDidMount(){
		  var BasicInfoForm = document.getElementById('BasicUserInfo');
	    TweenMax.fromTo(BasicInfoForm, 1.5, {y: 160, opacity: 1}, {y: 0, opacity: 1});	
	  }
	  	
	  handleSubmit(user){
	      	const {dispatch} = this.props;

	      	let userPromise = fetch('/BasicInfo', {
	              method: "POST",
	              body: JSON.stringify({firstName: user.firstName,
	                                    lastName: user.lastName})
			}).then((resp) => resp.json())
        .then((resp) => {
          return (resp);
      });

        dispatch(actions.change('Intro.basicUserInfo', userPromise));
        dispatch(actions.setPending('Intro.basicUserInfo', true));
	  }	
			//functionality to hide basicForm and display GenderForm



    render(){

        const onSubmitFailed = () => {
            var firstName = document.getElementsByClassName('firstName').value;
            var lastName = document.getElementsByClassName('lastName').value;

            if (!firstName || firstName.length > 15){
                document.getElementsByClassName('firstNameErrors').innerHtml = firstName + ' is not valid. Also needs to be less than fifteen characters.';
            }
            else if (!lastName || lastName.length > 15){
                document.getElementsByClassName('lastNameErrors').innerHtml = lastName + ' is not valid. Also needs to be less than fifteen characters.';
            } else {
                return;
            }
        }

        return(
      
            <Form id = 'BasicUserInfo' model = "Intro.basicUserInfo" onSubmit = {(user) => this.handleSubmit(user)} validators = {{'': onSubmitFailed()}}>
                    <h6> Welcome </h6>
                    <div className = "field">
                      <label> First Name: </label>
                      <Control.text model = ".firstName"
                                    className = 'firstName'
                                    placeholder = "First Name"
  		                              required
                                    validateOn = "change"/>
                      <div className = 'Errors'>
                        <span className = 'firstNameErrors'>
                        </span>
                      </div>
                    </div>
                    <div className = "field">
  	                  <label> Last Name: </label>
                      <Control.text model=".lastName"
                                    className = 'lastName'
                                    placeholder = "Last Name"
  			                            required
                                    validators = {{maxLength: (val) => val.length <= 15}}
                                    validateOn = "change"/>
                      <div className = 'Errors'>
                          <span className = 'lastNameErrors'>
                          </span>
                      </div>
                    </div>
                    <Control.button model="Intro.basicUserInfo" type = "submit" disabled={{valid: false}}>
                        Submit
                    </Control.button>
            </Form>
        )
    }
}


export default BasicInfo