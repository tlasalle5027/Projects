import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: [{
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman Across Water',
        id: 1
      }, {
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman Across Water',
        id: 2
      }, { 
      name: 'Dirty Water',
      artist: 'The Standells',
      album: 'Dirty Water',
      id: 3
    }],
      playlistName: 'Boston Songs',
      playlistTracks: [{
        name: 'Dirty Water',
        artist: 'The Standells',
        album: 'Dirty Water',
        id: 3
      }, {
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman Across Water',
        id: 2
      }] 
    };
  }  
  
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
