import {Component} from 'react'
import './index.css'

class GameOver extends Component {
  render() {
    const {resetGame, score} = this.props

    return (
      <div className="gameover-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="tropy-img"
        />
        <h1>YOUR SCORE </h1>
        <p>{score}</p>
        <button type="button" onClick={resetGame}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          <p>PLAY AGAIN</p>
        </button>
      </div>
    )
  }
}

export default GameOver
