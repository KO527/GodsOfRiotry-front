import React, { Component } from 'react';
import Link from 'link-react';
import SC from 'soundcloud';


class Playlist extends Component {
  
  
  componentDidMount(){
      	if (!SC.isConnected()){
			this.props.auth().then(function(playlist){
				for(var i = 0; i < playlist.length; i++){
					this.props.embedItems(playlist[i].permalink_url);
	       		};
			});
  		}
		else {
			const {id} = this.props.match.params;
        	this.props.replacePlaylist(id);
			SC.get('/me', function(response){
				this.props.tracksAndPlaylists("http://soundcloud.com/" + response.permalink + "/tracks", "http://soundcloud.com/" + response.permalink + '/sets');
			}); 
        }

        document.querySelector('.connect_disconnect_container').addEventListener('click', function(){
			var link = document.querySelector('connect_disconnect_container');
			if (link.innerHtml === <img alt = '' src = {require('../images/btn-disconnect-m.png')}/>){
				this.disconnect();
			}
			else if (link.innerHtml === <img alt = '' src = {require('../images/btn-connect-m.png')}/>){
				// Find a way for user to connect with their own credentials;
				SC.connect();
			} else {
				return;
			}
		});
  }

		
 	
  disconnect(){
		document.getElementsByClassName('media_play').innerHtml = "";
        this.props.getInitialPlaylist().then(function(playlist){
          for(var i=0; i < playlist.length; i++){
			this.props.embedItems(playlist[i].permalink_url);
	  	  }
		}).then(function(){
		    document.getElementsByClassName("connect_disconnect_container").innerHtml = <img alt = '' src = {require('../images/btn-connect-m.png')}/>;
		});
  }
 
  
  embedSongs(playlist){ 
      document.querySelector('ul.ListOfPlaylists').innerHtml = ' ';
      this.props.setTracksToNil();
      for(var i = 0; i < playlist.length; i++){
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
				{this.props.playlists.forEach((playlist) => {
					var PlaylistList = document.querySelector("ul.ListOfPlaylists");
					PlaylistList.append('<li ref={playlist => this.preferredPlaylist = playlist} onClick = {this.embedSongs(this.preferredPlaylist)} className = "playlistItem">' + playlist.title + '</li>');
     			})};
		       </ul>
		    </div>
		)
  	}
}
  


export default Playlist;

