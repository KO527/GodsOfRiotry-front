import React, { Component } from 'react';
import { connect } from 'react-redux';
var SC = require('node-soundcloud');

export default class Playlist extends Component {
  
  
  componentDidMount(){
	SC.initialize({
            client_id: ENV["SOUNDCLOUD_CLIENT_ID"],
            redirect_uri: "http://godsofriotry.com/playlist" 
        });

        this.props.getInitialPlaylist().then(function(playlist){
		SC.oEmbed(playlist, element: document.getElementByClassName('media_play'));
        });
  }

  var connect = "<img src = '../../images/btn-connect-m.png'>";
  var disconnect = "<img src = '../../images/btn-disconnect-m.png'>";
  
  componentWillReceiveProps(nextProps){
	if (this.props.term.playlistTitle !== nextProps.term.playlistTitle){
	  	this.getPlaylist();
	}
	else{
	   this.props.term.tracks.map((track) => function(track){
	     if (!nextProps.term.tracks.include(track)){
		this.getPlaylist();
	     }
	   }	
	}
   }
		
		
	 
  connect(){
	
	SC.connect().then(function(){
		return SC.get('/me');
	}).then(function(me){
		document.getElementsByClassName("connect_disconnect_container").innerHtml = disconnect;
		this.importPlaylist();
		return true;
	}).catch(function(reason){
		alert(reason);
		return false;
	};
  }
 
  disconnect(){
	document.getElementsByClassName('media_play').innerHtml = "";
	const {id} = this.props.match.params;
	this.props.replacePlaylist(id);
	this.props.getInitialPlaylist().then(function(playlist){
         SC.oEmbed(playlist, element: document.getElementByClassName('media_play'));
        }).then(function(){
	    document.getElementsByClassName("connect_disconnect_container").innerHtml = connect;
	});
  }
  
  getPlaylist(){
	document.getElementByClassName('media_play').innerHtml = '';
	return SC.get('me/${this.props.term.playlistTitle}').then(function(playlist){
		SC.oEmbed(playlist, element: document.getElementByClassname('media_play'));
	}
  }

  importPlaylist(){
	this.props.term.playlistTitle = prompt('Which playlist do you wish to import?', 'Playlist Name:', 'Name:');
	
	this.getPlaylist().then(function(playlist){
		SC.oEmbed(playlist, element: document.getElementByClassName('media_play'));
	});
  }
  
  render(){
      return(
           <div className="PlaylistLayout">
               <header className= "media">
        	  <div className "search-bar">
			<input value = {this.state.term} onChange={event => this.onInputChange(event.target.value)} />
                  </div>
	          <nav>
		     <li className="media_play">
               
		     </li>
		     <Link to = {connect() ? this.disconnect() : this.connect() } className = "connect_disconnect_container">
		     </Link>
                  </nav>
               </header>
	   </div>
      );
  }
		
}

function mapStateToProps(state){
	return {playlist: state.playlist}
}

default connect(mapStateToProps, {replacePlaylist, getInitialPlaylist})(Playlist);

