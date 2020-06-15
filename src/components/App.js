import React, { Component } from 'react';

import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: "Matto Attacko",
        score: 0,
        id: 1
      },
      {
        name: "Jiji Cat",
        score: 0,
        id: 2
      },
      {
        name: "Momma Bear",
        score: 0,
        id: 3
      },
      {
        name: "Dr G-Easy",
        score: 0,
        id: 4
      }
    ]
  };

  // player id counter
  prePlayerId = 4;  

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  }

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  render() {

    const highScore = this.getHighScore();

    return (
      <div className="scoreboard">
        <Header players={this.state.players}/>
  
        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index} 
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}  
            isHighScore={highScore === player.score}         
          />
        )}

        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
