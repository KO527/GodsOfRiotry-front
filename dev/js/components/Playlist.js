import React, { Component } from 'react';
import { connect } from 'react-redux';
var SC = require('node-soundcloud');

export default class Playlist extends Component {
  
  constructor(props){
	super(props);
 	
	this.onInputChange = this.onInputChange.bind(this); 	
  }  
  
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

  //need to discern between whether object entered into searchForQueries is a track or playlist
 
  componentWillReceiveProps(nextProps){
	if (this.props.playlistTitle !== nextProps.playlistTitle){
	  	this.getPlaylist();
	}
	else{
	   this.props.tracks.map((track) => function(track){
	     if (!this.props.tracks.include(nextProps.track)){
		this.props.addTracks(nextProps);
	     }
	   }	
	}
   }
		
 		
	 
  connect(){
	
	if (SC.isConnected() && document.getElementsByClassName('connect_disconnect_container').innerHtml == disconnect){
		return false;
	}
	else if (SC.isConnected() && document.getElementsByClassName('connect_disconnect_container').innerHtml == connect){
		return false;
	}
  }

  SC.connect().then(function(){SC.get('/me');}).then(function(me){})
 
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
	SC.get('me/${this.props.term.playlistTitle}').then(function(playlist){
		SC.oEmbed(playlist, element: document.getElementByClassname('media_play')).then(function(){ document.getElementsByClassName("connect_disconnect_container").innerHtml = disconnect;
		}());
   	}
  }

  importPlaylist(){
	this.props.term.playlistTitle = prompt('Which playlist do you wish to import?', 'Playlist Name');
	
	this.getPlaylist();
  }
  
  render(){
      return(
           <div className="PlaylistLayout">
               <header className= "media">
                 <nav>
		     <li className="media_play">              
		     </li>
		     <Link to = {connect() ? this.importPlaylist() : this.disconnect()} className = "connect_disconnect_container">
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

