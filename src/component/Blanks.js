import React, { Component } from 'react';

class Blanks extends Component {
    render() {
        //Render blanks for word
        let str = ""; 
        // for each letter in the target word
        for(let i = 0; i < this.props.gameState.answer.length; i++){
          let found = false;
          // loop through the pastGuesses
          for(let j = 0; j < this.props.gameState.pastGuesses.length; j++){
            // and check each element of past guesses to see if it matches the
            if(this.props.gameState.answer[i] === this.props.gameState.pastGuesses[j]){
              found = true;
            }
          }
          if(found){
            str += this.props.gameState.answer[i];
            str += "\t";
          }
          else{
            str += "_\t";
          }
        }

        //Hide blanks at the end of the game, reveal otherwise.
        if (this.props.gameState.answer.length === this.props.gameState.rightGuesses
            || this.props.gameState.nWrong >= 6) {
                str = '';
        }
        return (
            <div className="blanks">{str}</div>
        )
    }
}

export default Blanks;