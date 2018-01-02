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
                }).then(function(track){
                        this.setState({term.tracks: [...this.state.term.tracks, track.title]});
                }, SC.get('/playlists', {  
                        q: term, license: 'cc-by-sa'    
                }).then(function(playlist){
                        this.setState({term.playlistTitle: playlist.title});
                })).catch(function(error){
                        console.log(error);
                });
	}
       
        onInputChange(term){
		this.searchForQueries(TrackPlaylistSearch);
	}

	render(){
                const TrackPlaylistSearch = _.debounce((term) => {this.searchForQueries(term)}, 300);        

		return(
			<div className = "search_bar">
			    <input value = {this.state.term} onChange = { event => this.onInputChange(event.target.value)}/>
			</div>	
		);
	}

}
