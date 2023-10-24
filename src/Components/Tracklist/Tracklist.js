import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

import PausePlayIcon from '../PausePlayIcon/PausePlayIcon';     //trying to add an audio sample 2 !!!!!!!

const elements = [];                               //trying to add an audio sample 2 !!!!!!!

class Tracklist extends React.Component {
    constructor(props) {
      super(props);                                 //trying to add an audio sample 2 !!!!!!!

      this.state = {
        activeElement: null,
        allElements: elements
      };
      this.toggleIndex = this.toggleIndex.bind(this);
   }

    toggleIndex(index) {        
     let audio = document.getElementById(index);
     let allAudios = document.querySelectorAll('audio');
     audio.volume = 0.1;

     if(this.state.activeElement === index) {
         this.setState({ activeElement: null });
         audio.pause();
     }
     else {
         this.setState({ activeElement: index });
         allAudios.forEach(function(audio){
             audio.pause();
         });
         audio.play();
     }
   }
  
  
  render() {
      return (
        <div className="Tracklist">
          {/* you will add a map method that renders a set of Track components */}
          {this.props.tracks.map((song, index) => {
            elements.push(index)                         //trying to add an audio sample 2 !!!!!!!
            return (
              <div key={index}>                           
              <PausePlayIcon
                  allElements={this.state.allElements}
                  activeElement={this.state.activeElement}
                  toggleIndex={this.toggleIndex}
                  preview={song.preview}
                  index={index}
              />
              <Track 
              key={song.id} 
              track={song} 
              onAdd={this.props.onAdd} 
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
              />
            </div>
            )
          })}
        </div>
      );
    }
  }

  export default Tracklist;