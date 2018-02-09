import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'link-react';

var SC = require('node-soundcloud');


export default class Playlist extends Component {
  
  constructor(props){
	super(props);
 	
	this.onInputChange = this.onInputChange.bind(this); 	
  }  
  
  componentDidMount(){
      	if (!SC.isConnected()){
		this.props.getInitialPlaylist().then(function(playlist){
			for(i = 0; i < playlist.length; i++){
				this.embedItems(playlist[i].permalink_url);
        		});
		}
  	}
	else {
		const {id} = this.props.match.params;
        	this.props.replacePlaylist(id);
		SC.get('/me', function(response){
			this.props.tracksAndPlaylists("http://soundcloud.com/" + response.permalink + "/tracks", "http://soundcloud.com/" + response.permalink + '/sets');}); 
        }
  }

  var connect = "<img src = '../../images/btn-connect-m.png'>";
  var disconnect = "<img src = '../../images/btn-disconnect-m.png'>";

		
 	
  disconnect(){
	document.getElementsByClassName('media_play').innerHtml = "";
        this.props.getInitialPlaylist().then(function(playlist){
          for(i=0; i < playlist.length; i++){
		this.props.embedItems(playlist[i].permalink_url);
	  }
	}).then(function(){
	    document.getElementsByClassName("connect_disconnect_container").innerHtml = connect;
	});
  }
 
  document.querySelector('.connect_disconnect_container').addEventListener('click', function(){
	var link = document.querySelector('connect_disconnect_container');
	if (link.innerHtml == disconnect){
		disconnect();
	}
	else if (link.innerHtml == connect){
		this.props.connect();
	} else {
		return;
	}
  } 
  
  embedSongs(playlist){ 
      document.querySelector('ul.ListOfPlaylists').innerHtml = ' ';
      this.props.setTracksToNil();
      for(i = 0; i < playlist.length; i++){
	this.props.embedItems(playlist[i]);	
      }
  }

  render(){
      return(
           <div className="PlaylistLayout">
               <header className= "media">
               </header>
	       <ul className = "media_play">
	      
	       </ul>
	       <Link className = "connect_disconnect_container">
               </Link>
	       <ul class = "ListOfPlayLists">
		{this.props.playlists.forEach(playlist){
			PlaylistList = document.querySelector("ul.ListOfPlaylists");
			PlaylistList.append('<li ref={playlist => this.preferredPlaylist = playlist} onClick = {this.embedSongs(this.preferredPlaylist)} className = 'playlistItem'>' + playlist.title + '</li>');	 	
		}();}
	       </ul>
	    </div>
	)
  }
}
  
function mapStateToProps(state){
	return {playlist: state.playlist}
}

default connect(mapStateToProps, {replacePlaylist, getInitialPlaylist})(Playlist);

