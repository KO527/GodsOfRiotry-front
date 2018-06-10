import React, { Component } from 'react';
import SC from 'soundcloud';


class Playlist extends Component {
  
  constructor(){
  	super();
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
		    </div>
		)
	}
}
  


export default Playlist;

