export default class Playlist extends Component {
 
  var SC = require('node-soundcloud');  

  componentWillMount(){
	SC.initialize({
            client_id: ENV["SOUNDCLOUD_CLIENT_ID"],
            redirect_uri: "http://godsofriotry.com/playlist" 
        });
        this.props.getInitialPlaylist().then(function(playlist){
		SC.oEmbed(playlist, element: document.getElementByClassName('media-play'));
        });
  }

  
  connect(){
	
	SC.connect().then(function(){
		return SC.get('/me');
	}).then(function(me){
		document.getElementsByClassName("connect-disconnect-container").innerHtml = "<img src = "../../images/btn-disconnect-m.png">";
		return true
	}).catch(function(reason){
		alert(reason);
		return false;
	};
  }
 
  disconnect(){
	
	SC.initialize({oauth_token: null}).then(function(){
		document.getElementsByClassName("connect_disconnect_container").innerHtml = "<img src="../../images/btn-connect-m.png">";
	});
  }

  render(){
      return(
           <div className="PlaylistLayout">
               <header className= "media">
                  <nav>
		     <li className="media-play">
               
		     </li>
		     <Link to = {connect() ? this.connect() : this.disconnect() }>
		      <img src = "../../images/btn-connect-m.png" className="SoundCloudSignIn"/>
		     </Link>
                  </nav>
               </header>
	   </div>
      );
  }
		
}
