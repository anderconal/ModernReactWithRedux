import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YouTubeSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCFo9mw1GoTQh3FgpiKYyI5whWL_sBRwzc';

// Create a new component. This componet should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos : [],
      selectedVideo: null 
    };

    this.videoSearch('Invasores Bumping');
  }

  videoSearch(term) {
    YouTubeSearch({key : API_KEY, term : term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0] 
      }); // Same variable name: this.setState({ videos: videos }) or this.setState({videos});
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})} 
          videos = {this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
