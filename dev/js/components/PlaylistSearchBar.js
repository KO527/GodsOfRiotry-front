class PlaylistSearchBar extends Component{

	constuctor(props){
	
		super(props);
		this.state = {
		    term: {
			playlistTitle: '',
			tracks: []
	            }
         	};
	}

	searchForQueries(term){
		SC.get('/tracks', {
			q: term, license: 'cc-by-sa'
                }).then(function(tracks){			
		       this.layoutTracks(tracks);
                });
	}
	
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
	       
        onInputChange(term){
		this.searchForQueries(term);
	}

	document.querySelector(".search").addEventListener('click', function() {
 		 input = document.querySelector("input").value;
  		 SoundCloudAPI.getTrack(input);
        });

	document.querySelector(".input-search").addEventListener('keyup', function(e) {

  		var input = document.querySelector("input").value;

  		if (e.which === 13) {
    			SoundCloudAPI.getTrack(input);
  		}
	});
 
        setupTracks(newTracks){
		this.setState({tracks: [...this.state.term.tracks, newTracks]);
	}

	render(){
                const TrackPlaylistSearch = _.debounce((term) => {this.searchForQueries(term)}, 300);        

		return(
			<div className = "search_bar">
			    <input onChange = { event => this.onInputChange(event.target.value)}/>
			</div>	
		);
		<Playlist playlistTitle = {this.state.term.playlistTitle} tracks = {this.state.term.tracks} addTracks = {setupTracks}/>
	}

}

