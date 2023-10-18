import React from 'react';
import './App.css';
//import { render } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../Util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
    // {
    //   name: "Example track name",
    //   artist: "Example track artist",
    //   album: "Example track album",
    //   id: 1,
    // },
    // {
    //   name: "Example track name 2",
    //   artist: "Example track artist 2",
    //   album: "Example track album 2",
    //   id: 2,
    // },
    
      ],
      playlistName: "Example Playlist",
      playlistTracks: [
        // {
        //   name: "Example playlist track name",
        //   artist: "Example playlist track artist",
        //   album: "Example playlist track album",
        //   id: 3,
        // },
        // {
        //   name: "Example playlist track name 4",
        //   artist: "Example playlist track artist 4",
        //   album: "Example playlist track album 4",
        //   id: 4,
        // },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
}

  addTrack (track) {
    const foundTrack = this.state.playlistTracks.find((playlistTrack) => playlistTrack.id === track.id);
    const newTrack = this.state.playlistTracks.concat(track);
    
    foundTrack ? console.log("Track already exists") : this.setState({ playlistTracks: newTrack })

      // if (foundTrack) {
      //   console.log("Track already exists");
      // } else {
      //   this.setState({ playlistTracks: newTrack });
      // }
  }

  removeTrack(track) {
    const isPresent = this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: isPresent });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((result) => {
        this.setState({ searchResults: result });
        //console.log(term);
    });   
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            {/* add a search result component */}
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} 
            />

            {/* add a playlist component */}
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
