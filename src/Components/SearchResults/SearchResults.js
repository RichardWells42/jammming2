import React from 'react';
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist"

class SearchResults extends React.Component {
    render() {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          {/* add a tracklist component */}
          <Tracklist 
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd} 
          isRemoval={false} 
          />
        </div>
      );
    };
  };

  export default SearchResults;