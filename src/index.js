import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YouTubeSearch from 'youtube-api-search';
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyCFo9mw1GoTQh3FgpiKYyI5whWL_sBRwzc';

// Create a new component. This componet should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos : [] };

    YouTubeSearch({key : API_KEY, term : 'Danny Party Bumping'}, (videos) => {
      this.setState({ videos }); // Same variable name: this.setState({ videos: videos });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoList videos = {this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
