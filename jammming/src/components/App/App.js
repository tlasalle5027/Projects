import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [] 
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({ playlistTracks: newPlaylist });
    }
  }

  removeTrack(track){
    let newPlaylist = this.state.playlistTracks;
    newPlaylist = newPlaylist.filter
      (currentTrack => currentTrack.id !== track.id);
    
    this.setState({ playlistTracks: newPlaylist });
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name });
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track =>
      track.uri);

  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });

    });
  }

  
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist}
                      onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
