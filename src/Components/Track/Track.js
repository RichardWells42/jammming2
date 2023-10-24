import React from "react";
import "./Track.css";


class Track extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {play: false};
    // this.audio = new Audio(this.props.track.audio);   // for audio sample

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    // this.togglePlay = this.togglePlay.bind(this);     // for audio sample
  }
  
  renderAction() {
      if (this.props.isRemoval) {
        return (
          <button className="Track-action" onClick={this.removeTrack}>
            -
          </button>
          );
      } else {
        return (
          <button className="Track-action" onClick={this.addTrack}>
            +
          </button>
        );
      }
    }

    addTrack() {
      this.props.onAdd(this.props.track);
    }

    removeTrack() {
      this.props.onRemove(this.props.track);
    }

    //added this to add audio sample
    // togglePlay() {
    //   this.setState({ play: !this.state.play });
    //   if (this.state.play) {
    //     this.audio.play();
    //   } else {
    //     this.audio.pause();
    //   }
    // }

    render() {
      return (
        <div className="Track">

          {/* <button className="play" onClick={this.togglePlay}>
              <img src={this.props.track.cover}
              alt={this.props.track.album}                       //trying to add audio sample
              className="cover"/>
            </button> */}

          <div className="Track-information">
            {/* <h3><!-- trackname will go here --></h3> */}
            {/* <p><!-- track artist will go here --> | <!-- track album will go here --></p> */}
            <h3>{this.props.track.name}</h3>
            <p>
              {this.props.track.artist} | {this.props.track.album}
            </p>

            {/* <h3>{this.props.track.playlistName}</h3>
            <p>{this.props.track.playlistArtist} {this.props.track.playlistAlbum}</p> */}

          </div>
          {/* <button className="Track-action"><!-- + or - will go here --></button> */}
          {this.renderAction()}
        </div>
      );
    }
  }

  export default Track;