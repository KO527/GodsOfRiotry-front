import React, {Component} from 'react';
import auth from './auth/auth';
import PlaylistSearchBar from '/'
import ReactPlayer from 'react-player';

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

	    return (
		  	<div>
		  		<div id='welcome-view'>
		  			<div className='header'>
		  				<span className='welcome-firstName'>Hello `${user.firstName}`</span>
				        {
				          	loggedIn && !isAuthenticated && (
				              <button className='logout-btn'
				                onClick={this.logout.bind(this)}
				              >
				                Log Out
				              </button>
				            )
				        }
				    </div>
			        <ReactPlayer height={height} width='100%' style={welcomeVid} playing=true muted loop=true />
		        </div>
		        <PossibleMatches />
		        <EventTickets />
		  	</div>
	    );
  }

}

function mapStateToProps(state){
	loggedIn: state.authentication.loggedIn,
	user: state.authentication.user
}

export default connect(mapStateToProps, null)(Home);