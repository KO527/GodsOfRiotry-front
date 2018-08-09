import React from 'react';
import checkQueryValidity from '../services/checkQueryValidity';

import {
  Container,
  Input,
  Card,
  Button
} from 'semantic-ui-react';

class SCsearch extends Component {
	constructor(){
		super();
		this.init();

	    this.renderTracks.bind(this);
		this.getTrack.bind(this);
	}

	init(){

	    SC.initialize({
	        client_id: '195d273fb18f4a9a75ebda65c1aa2631'
	    });
	}

	componentDidMount(){

	    var input; 

	    document.querySelector(".search").addEventListener('click', function() {
	      input = document.querySelector("input-search").value;
	      this.getTrack(input);
	    });

	    document.querySelector(".input-search").addEventListener('keyup', (e) => {

	      input = document.querySelector("input").value;

	      if (e.which === 13) {
	        this.getTrack(input);
	      }
	    });

		const sideBar = document.querySelector(".js-playlist");
    	sideBar.innerHTML = localStorage.getItem('key');

    	this.getTrack();		

    }

	localStorageClear = e => {
      e.preventDefault();
      window.localStorage.clear();
      document.location.reload(true);
  	};

	getTrack(inputValue) {

	    //find all sounds of buskers licensed under 'creative commons share alike'
	    SC.get('/tracks', {
	      q: inputValue
	    }).then((tracks) => { // then is a "promise"
	      console.log(tracks);
	      this.renderTracks(tracks);
	    });
  	}

	renderTracks() {
		const {SCqueries} = this.props;

		SCqueries.forEach((track) => {
			
			var card = document.createElement('div');
		    card.classList.add("card");

		    // image
		    var imageDiv = document.createElement('div');
		    card.classList.add("image");

		    var image_img = document.createElement('img');
		    image_img.classList.add('image_img');
		    image_img.src = track.artwork_url || 'https://f4.bcbits.com/img/a2220063837_10.jpg';

		    imageDiv.appendChild(image_img);

		    // content
		    var content = document.createElement('div');
		    content.classList.add('content');

		    var header = document.createElement('div');
		    header.classList.add('header');
		    header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

		    // button 
		    var button = document.createElement('div');
		    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

		    var icon = document.createElement('i');
		    icon.classList.add('add', 'icon');

		    var buttonText = document.createElement('span');
		    buttonText.innerHTML = 'Add to playlist';

		    // appendChild
		    content.appendChild(header);

		    button.appendChild(icon);
		    button.appendChild(buttonText);

		    button.addEventListener('click', function() {
		      this.getEmbed(track.permalink_url);
		    });

		    card.appendChild(imageDiv);
		    card.appendChild(content);
		    card.appendChild(button);

		    var searchResults = document.querySelector('#audioHere');
		    searchResults.appendChild(card);

	 	})
 	}

 	getEmbed(trackURL) {
		  console.log('clicked');
		  SC.oEmbed(trackURL, {
		    auto_play: false
		  }).then(function(embed) {
		    console.log('oEmbed response: ', embed);

		    var sideBar = document.querySelector('#playlist');

		    var box = document.createElement('div');
		    box.innerHTML = embed.html;

		    sideBar.insertBefore(box, sideBar.firstChild);
		    localStorage.setItem('key', sideBar.innerHTML); // set a key value pair

		  });
	}


	render(){

		return (
		      <div id = "soundcloud-player">
		        <Container className='col'>
		          <div className='col-left js-playlist toggle'>
		            <div className='inner'>
		            </div>
		          </div>
		          <div className='col-right'>
		            <div className = 'main icon'>
		              <Input size='massive' icon='search' input = {{ className: 'input-search js-search' }} placeholder='Search for a song or artist...'/>
		              <Button onClick={this.localStorageClear} className='clear' content='Clear Playlist'/>
		              <Button content='Show/Hide Playlist' id='toggle' className='hide-toggle'/>
		              <Card.Group className='js-search-results search-results'/>
		            </div>
		          </div>
		        </Container>
		      </div>
    	)
	}
}

export default SCsearch;
