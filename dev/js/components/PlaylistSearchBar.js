import React from 'react';
import SC from 'soundcloud';

class PlaylistSearchBar extends Component{

	constuctor(){
		
		this.state = {
		    term: {
				tracks: [],
				playlists: [] 
			}
        };
	}
	
	searchForQueries(term){
		SC.get('/tracks', {
			q: term, license: 'cc-by-sa'
        }).then(function(tracks){			
		    this.layoutTracks(tracks);
		    this.setState({term: { ...this.state.term, tracks: tracks}});
        });
	}

	localStorageClear() {
  		window.localStorage.clear();
  		document.location.reload(true);
	};

	layoutTracks(tracks){
		tracks.forEach(function(track){
			var card = document.createElement('div');
			card.classList("card");
			
			var ImageDiv = document.createElement('div');
			card.classList("card");
			
			var image_img = document.createElement('img');
			image_img.classList.add('image_img');
			image_img.src = track.artwork_url || 'https://f4bcbits.com/img/a222006837_10.jpg';
			imageDiv.appendChild(image_img);
			
			var content = document.createElement('div');
			content.classList.add('content');
		
			var header = document.createElement('div');
			header.classList.add('header');
			header.innerHtml = '<a href = " '+ track.permalink_url + '"target-"_blank">' + track.title + '</a>';
			
			
		 	var button = document.createElement('div');
			button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
			var icon = document.createElement('i');
			icon.classList.add('add', 'icon');
			
			var buttonText = document.createElement('span');
			buttonText.innerHtml = 'Add to playlist';
			
			content.appendChild(header);
			button.appendChild('header');
			button.appendChild(buttonText);
			button.addEventListener('click', function(){
				this.getEmbed(track.permalink_url);
			});
			
			card.appendChild(imageDiv);
			card.appendChild(content);
			card.appendChild(button);
			
			var searchResults = document.querySelector('.js-search-results');
			
			searchResults.appendChld(card);
		});
	}		
	
    getEmbed(trackUrl){
		SC.oEmbed(trackUrl, {autoplay: false}, {maxHeight: 81}).then(function(embed){
			var mediaPlay = document.querySelector('media-play');
			if (!this.state.tracks.includes(embed)){
				this.setState({...tracks, track: embed});
				var box = document.createElement('div');
				box.innerHtml = embed.html;
				mediaPlay.insertBefore(box, mediaPlay.firstChild);
				sessionStorage.setItem('key', mediaPlay.innerHtml);
			} else {
				return;
			}
		});
	}

     
	
	render(){

		document.querySelector(".search").addEventListener('click', function() {
 		 input = document.querySelector("input").value;
  		 this.searchForQueries(input);
	    });
        
		document.querySelector(".input-search").addEventListener('keyup', function(e) {

	  		var input = document.querySelector(".input-search").value;

	  		if (e.which === 13) {
	    			this.searchForQueries(input);
	  		}
		});


		return(
			<div>
				<div class="main">
	        			<div class="ui massive icon input">
	          				<input type="text" placeholder="Search for a song or artist..." class="js-search input-search"/>
	          				<i class="search icon js-submit"></i>
	        			</div>
	        			<button onclick="localStorageClear();" class="clear">Clear Playlist</button>
				</div>

				<div class="search-results js-search-results ui cards">

			    </div>
				<Playlist playlists = {this.state.term.playlists} setTracksToNil = {this.setState({tracks: []})} embedItems = {this.getEmbed}/>
			</div>
		);
	}
}


function mapStateToProps(state){
	const tracks = state.track;
	return {
		tracks
	}
}