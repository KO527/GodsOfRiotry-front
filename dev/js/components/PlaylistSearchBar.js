class PlaylistSearchBar extends Component{

	constuctor(props){
	
		
		super(props);
		
		this.state = {
		    term: {
			playlistTitle: '',
			trackTitle: '',
			tracks: [],
			playlists: [] 
		   }
         	};
	}
	
	componentDidMount(){
            SC.initialize({
            	client_id: ENV["SOUNDCLOUD_CLIENT_ID"],
            	redirect_uri: "http://godsofriotry.com/playlist"
            });    
	
	}
	
	connect(){
        	SC.connect(function(){
             	SC.get('/me', function(response){
                	this.setState(term.tracks: "http://soundcloud.com/" + response.permalink + '/tracks', term.playlists: "http://soundcloud.com/" + response.permalink + '/sets');});
        	});
 	}
	
	searchForQueries(term){
		SC.get('/tracks', {
			q: term, license: 'cc-by-sa'
                }).then(function(tracks){			
		       this.layoutTracks(tracks);
                });
	}
	var localStorageClear = function() {
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
			SC.oEmbed(trackUrl, {autoplay: false}, {maxHeight: 10%}).then(function(embed){
				var mediaPlay = document.querySelector('media-play');
				var box = document.createElement('div');
				box.innerHtml = embed.html;
				mediaPlay.insertBefore(box, mediaPlay.firstChild);
				sessionStorage.setItem('key', mediaPlay.innerHtml);
				this.setState({...tracks, [track: embed]});
			});
	}

     
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
	
	render(){
		return(
			<div class="main">
        			<div class="ui massive icon input">
          				<input type="text" placeholder="Search for a song or artist..." class="js-search input-search">
          				<i class="search icon js-submit"></i>
        			</div>
        			<button onclick="localStorageClear();" class="clear">Clear Playlist</button>
			</div>

			<div class="search-results js-search-results ui cards">

		        </div>
		);
		<Playlist embedItems = {this.getEmbed} connect = {this.connect()}  playlistTitle = {this.state.term.playlistTitle} tracksAndPlaylists = (tracks, playlists) => {this.setState{(term.tracks: tracks, term.playlists: playlists}} />
	}
}

