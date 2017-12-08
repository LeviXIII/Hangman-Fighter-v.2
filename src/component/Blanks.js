import React, { Component } from 'react';
import { connect } from 'react-redux';


class Blanks extends Component {
    render() {
        //Render blanks for word
        let str = ""; 
        // for each letter in the target word
        for(let i = 0; i < this.props.answer.length; i++){
          let found = false;
          // loop through the pastGuesses
          for(let j = 0; j < this.props.pastGuesses.length; j++){
            // and check each element of past guesses to see if it matches the
            if(this.props.answer[i] === this.props.pastGuesses[j]){
              found = true;
            }
          }
          if(found){
            str += this.props.answer[i];
            str += "\t";
          }
          else{
            str += "_\t";
          }
        }

        //Hide blanks at the end of the game, reveal otherwise.
        if (this.props.answer.length === this.props.rightGuesses || this.props.nWrong >= 6) {
                str = '';
        }
        return (
            <div className="blanks">{str}</div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      answer: state.gameState.answer,
      nWrong: state.gameState.nWrong,
      pastGuesses: state.gameState.pastGuesses,
      rightGuesses: state.gameState.rightGuesses,
  }
}

export default connect(mapStateToProps)(Blanks);