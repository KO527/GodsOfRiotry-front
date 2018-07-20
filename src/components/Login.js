import React, { Component } from 'react';
import connect from 'react-redux';
import ReactPlayer from 'react-player';
import auth from './Auth/Auth.js';
import { login } from './users_actions';

class Login extends Component{
	constructor(props) {
        super(props);
 
        // reset login status
        auth.logout();
        
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentDidMount(){
    	if (loggedIn){
    		this.goTo('home');
    	}
    }

    async handleSubmit(user) {
    	const { dispatch } = this.props;
	    
	    let userPromise = fetch('/Login', {
	      method: 'POST',
	      body: user
	    })
	    .then((res) => res.json())
	    .then((res) => {
	    	await login(res.username, res.password);
	    	await auth.login();
	    });

    	dispatch(actions.submit('user', userPromise));
    }
	 	
    goTo(route) {
    	this.props.history.replace(`/${route}`)
  	}

    render() {
        const { loggingIn, status } = this.props;
        const { username, password } = this.state;

        const height = window.innerHeight;

		const welcomeVid = {
			display: flex
		}


        return (
        	{if (loggingIn){

        	}}
        	<div id = "welcome-view">
	        	<div className='header'>
		        	<Form onSubmit={(user) => this.handleSubmit(user)} id="LoginInfo" model="Intro.LoginInfo">
		        		
		         		validators = {{'': { loginFailed: (status) => return status === 'userConstants.LOGIN_FAILURE' }}}
		        		
		        		<div className="field">
			        		<label htmlFor="email">Email:</label>
			        		<Control.text model=".email" 
			        					  className="Email"
			        					  placeholder="Email"
			        					  required
			        					  validators={{loginFailed, 
			        					  			   isRequired: (val) => val && val.length, 
			        					  			   maxLength: (val) => val && val.length < 255}}
			        					  validateOn="blur"/>
			        		<Errors model="Intro.LoginInfo"
			        				messages={{loginFailed: (val) => 'Credentials submitted are not valid.',
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
					    {!auth.isAuthenticated() && (
			                  <Control.button
			                    bsStyle="primary"
			                    className=""
			                  >
			                    Log In
			                  </Control.button>
			                  <Control.button onClick={/* scrollTo the top of !authenticated version of PossibleMatches and TweenMax Intro*/}>
			                  	Sign In
			                  </Control.button>
			                )
		            	}
		        	</Form>
		        </div>
        		<ReactPlayer height={height} width='100%' style={welcomeVid} playing=true muted loop=true />
        	</div>
        	<PlaylistSearchBar />
	        <PossibleMatches loggedIn={loggedIn}/>
	        <EventTickets />
        );
    }

}

const myPropTypes = Login.propTypes = {
	loggedIn: PropTypes.bool,
	loggingIn: PropTypes.bool,
	status: PropTypes.string
}

var stateProps = mapStateToProps;

PropTypes.checkPropTypes(myPropTypes, stateProps, 'prop', 'Login');

function mapStateToProps(state){
	loggedIn: state.authentication.loggedIn,
	loggingIn: state.authentication.loggingIn,
	status: state.authentication.type
}

export default connect(mapStateToProps, {login})(SignIn);