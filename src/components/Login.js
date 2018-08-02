import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import auth from '../auth/auth.js';
import { login } from '../actions/users_actions';
import Loader from 'react-loader-spinner';
import { actions, Control, Form, Errors } from 'react-redux-form';
import PropTypes from 'prop-types';
import PossibleMatches from './PossibleMatches';
import PlaylistSearchBar from './PlaylistSearchBar';
import EventTickets from './EventTickets';


class SignIn extends Component{
	constructor(props) {
        super(props);
 
        // reset login status
        auth.logout();
        
        this.state = {
            email: '',
            password: '',
            submitted: false,
            showLoader: "hidden"
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentDidMount(){
    	const { loggedIn, loggingIn } = this.props;

    	if (loggedIn){
    		this.goTo('home');
    	}
    	else if (loggingIn){
    		this.toggleLoader();
    	}
    }

    handleSubmit(user){
    	const { dispatch } = this.props;
	    
	    let userPromise = fetch('/Login', {
	      method: 'POST',
	      body: user
	    })
	    .then((res) => res.json())
	    .then( async (res) => {
	    	await login(res.username, res.password);
	    	await auth.login();
	    });

    	dispatch(actions.submit('user', userPromise));
    }
	 	
    goTo(route) {
    	this.props.history.replace(`/${route}`)
  	}

  	toggleLoader(){
  		let {loggingIn} = this.props;
  		var css = (loggingIn === "false") ? "hidden" : "show";
  		this.setState({showLoader: css});
  	}

    render() {
        const { loggingIn, status, loggedIn } = this.props;
        const { username, password } = this.state;

        const height = window.innerHeight - document.getElementsByClassName("header").style.height;

		const welcomeVid = {
		    display: 'flex'
		}

		// const show = {
		// 	opacity: .8;
		// 	display: flex;
		// 	justify-content: center;
		// 	position: relative;
		// 	z-index: 2;
		// 	background-color: #391F01;
		// }

		// const hidden = {
		// 	opacity: 0;
		// }

        return (
			<div>        
	        	<div id = 'welcome-view'>
	        			<div className='Intro-title'>GodsOfRiotry</div>
		        		<div className='header'>
				        	<Form onSubmit={(user) => this.handleSubmit(user)} id="LoginInfo" model="Intro.LoginInfo">
				        						        		
				        		<div className="field">
					        		<label htmlFor="email">Email:</label>
					        		<Control.text model=".email" 
					        					  className="Email"
					        					  placeholder="Email"
					        					  required
					        					  validators={{loginFailed: (status) => status === 'userConstants.LOGIN_FAILURE', 
					        					  			   isRequired: (val) => val && val.length, 
					        					  			   maxLength: (val) => val && val.length < 255}}
					        					  validateOn="blur"/>
					        		<Errors model="Intro.LoginInfo"
					        				messages={{loginFailed: 'Credentials submitted are not valid.',
					        						   isRequired: 'Please provide Email Address',
					        						   }}/>
					        	</div>
					        	<div className = "field">	
									<label> Password: </label>
									<Control.text model = ".password"
										      placeholder = "Password"
										      className = 'passwordText'
										      required
										      validators = {{isRequired: (val) => val && val.length, 
										      				 maxLength: (val) => val && val.length > 6}}
										      validateOn = "blur"/>
									<Errors model="Intro.LoginInfo"
					        				messages={{isRequired: 'Please provide Email Address'}}/>
							    </div>
							    {!auth.isAuthenticated() && !loggedIn &&
									(
										<div className="set-of-btns">
						                  <Control.button
						                    className="Intro-btn-login"
						                  >
						                    Log In
						                  </Control.button>
						                  <Control.button className = "Intro-btn-signup">{/*onClick={scrollTo the top of !authenticated version of PossibleMatches and TweenMax Intro*/}
						                  	Sign Up!
						                  </Control.button>
						                </div>
					                )
				            	}
				        	</Form>
				        </div>
				        {loggingIn && (<div className={this.state.showLoader}>
		  	      					 	<Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
		  	      					 	<ReactPlayer height={height} width='100%' style={welcomeVid} playing='true' muted loop='true' />
		  	      		 	 		   </div>)}
	        	 		{!loggingIn && !loggedIn && (
			        		<ReactPlayer height={height} width='100%' style={welcomeVid} playing='true' muted loop='true' />
			        	)}
			    </div>
	        	<PlaylistSearchBar />
		        <PossibleMatches loggedIn={loggedIn}/>
		        <EventTickets />
		    </div>
        );
    }

}

const myPropTypes = SignIn.propTypes = {
	loggedIn: PropTypes.bool,
	loggingIn: PropTypes.bool,
	status: PropTypes.string
}

var stateProps = mapStateToProps;

PropTypes.checkPropTypes(myPropTypes, stateProps, 'prop', 'Login');

function mapStateToProps(state){
	const {loggedIn, loggingIn, type} = state.authentication;
	return {loggedIn: loggedIn,
			loggingIn: loggingIn,
	 		status: type}
}

export default connect(mapStateToProps, {login})(SignIn);