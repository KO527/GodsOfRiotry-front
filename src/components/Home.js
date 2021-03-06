import React, {Component} from 'react';
import auth from '../auth/auth';
import ReactPlayer from 'react-player';
import PossibleMatches from './PossibleMatches';
import EventTickets from './EventTickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../../public/css/home.module.css';

class Home extends Component{
	constructor(props){
		super(props);

	}

	goTo(route) {
    	this.props.history.replace(`/${route}`)
  	}

  	logout() {
    	this.props.auth.logout();
    	this.props.logout();
  	}


  	render() {
    	const { isAuthenticated } = this.props.auth;
    	const { loggedIn, user } = this.props;
    	const height = window.innerHeight - document.getElementsByClassName("header").style.height;

    	const welcomeVid = {
		    display: 'flex'
		}

	    return (
		  	<div>
		  		<div id={styles.welcome-view}>
		  			<div className={styles.header}>
		  				<div className={styles.Intro-title}>GodsOfRiotry</div>
		  				<span className={styles.welcome-firstName}>Hello `${user.firstName}`</span>
				        {
				          	loggedIn && !isAuthenticated && (
				              <button className={styles.logout-btn}
				                onClick={this.logout.bind(this)}
				              >
				                Log Out
				              </button>
				            )
				        }
				    </div>
			        <ReactPlayer height={height} width='100%' style={welcomeVid} playing='true' muted loop='true' />
		        </div>
		        <PossibleMatches />
		        <EventTickets />
		  	</div>
	    );
  }

}

function mapStateToProps(state){
	const {loggedIn, user} = state.authentication;
	return {
		loggedIn: loggedIn,
		user: user
	}
}

export default connect(mapStateToProps, null)(Home);