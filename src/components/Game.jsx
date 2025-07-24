import React from 'react';
import Board from './Board';
import { boardConfigs } from '../boards';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getInitialState('level5'),
      currentBoard: 'level5',
    };
  }

  getInitialState = (boardId) => {
    const config = boardConfigs[boardId];
    return {
      history: [
        {
          squares: Array(config.width * config.height).fill(null),
          knightPos: null,
        },
      ],
      moveNumber: 0,
      showHints: false, // Ensure hints are off by default
      isFinished: false, // Ensure game is not finished by default
    };
  };

  isValidMove(from, to, squares) {
    const config = boardConfigs[this.state.currentBoard];
    if (from === null || squares[to] || config.disabled.includes(to)) {
      return false;
    }
    const fromX = from % config.width;
    const fromY = Math.floor(from / config.width);
    const toX = to % config.width;
    const toY = Math.floor(to / config.width);

    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }

  getPossibleMoves(knightPos, squares) {
    const config = boardConfigs[this.state.currentBoard];
    if (knightPos === null) {
      return [];
    }
    const moves = [];
    for (let i = 0; i < config.width * config.height; i++) {
      if (this.isValidMove(knightPos, i, squares)) {
        moves.push(i);
      }
    }
    return moves;
  }

  handleClick(i) {
    if (this.state.isFinished) return; // Add this line back

    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const knightPos = current.knightPos;

    if (knightPos !== null && !this.isValidMove(knightPos, i, squares)) {
        return;
    }

    if (knightPos === null) {
      // First click: Place the knight
      squares[i] = 'N'; // Place the knight marker
      this.setState({
        history: history.concat([
          {
            squares: squares,
            knightPos: i,
          },
        ]),
        moveNumber: 1,
      });
    } else {
      // Subsequent clicks: Move the knight
      squares[knightPos] = this.state.moveNumber;
      squares[i] = 'N'; // Place knight at new position
      this.setState({
        history: history.concat([
          {
            squares: squares,
            knightPos: i,
          },
        ]),
        moveNumber: this.state.moveNumber + 1,
      });
    }
  }

  jumpTo(step) {
    this.setState({
      moveNumber: step,
    });
  }

  resetGame = () => {
    this.setState(this.getInitialState(this.state.currentBoard));
  };

  handleShowHints = () => {
    const password = prompt('암호를 입력하세요:');
    const config = boardConfigs[this.state.currentBoard];
    if (password && parseInt(password, 10) === config.prime) {
      this.setState({ showHints: true });
    } else {
      alert('암호가 틀렸습니다!');
    }
  };

  handleFinish = () => {
    this.setState({ isFinished: true, showHints: false });
  };

  handleBoardChange = (event) => {
    const boardId = event.target.value;
    this.setState({
      ...this.getInitialState(boardId),
      currentBoard: boardId,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const squares = current.squares;
    const knightPos = current.knightPos;
    const possibleMoves = this.getPossibleMoves(knightPos, squares);
    const config = boardConfigs[this.state.currentBoard];

    const hints = {};
    if (this.state.showHints) {
      possibleMoves.forEach(move => {
        const nextSquares = squares.slice();
        nextSquares[knightPos] = this.state.moveNumber + 1;
        nextSquares[move] = 'N';
        hints[move] = this.getPossibleMoves(move, nextSquares).length;
      });
    }

    return (
      <div className="game">
        <h1>나이트의 여정</h1>
        <div className="game-controls">
          <select onChange={this.handleBoardChange} value={this.state.currentBoard}>
            {Object.keys(boardConfigs).map(key => (
              <option key={key} value={key}>
                {boardConfigs[key].name}
              </option>
            ))}
          </select>
        </div>
        <Board
          key={this.state.currentBoard} /* Add key prop here */
          squares={squares}
          onClick={(i) => this.handleClick(i)}
          possibleMoves={possibleMoves}
          hints={hints}
          boardConfig={config}
          history={this.state.history}
          isFinished={this.state.isFinished}
          moveNumber={this.state.moveNumber}
        />
        <div className="game-info">
          <div>이동 횟수: {this.state.moveNumber}</div>
          <button onClick={this.resetGame}>초기화</button>
          <button
            onClick={() => this.jumpTo(this.state.moveNumber - 1)}
            disabled={this.state.moveNumber === 0 || this.state.isFinished}
          >
            되돌리기
          </button>
          <button onClick={this.handleShowHints} disabled={this.state.isFinished}>
            힌트 보기
          </button>
          <button onClick={this.handleFinish} disabled={this.state.isFinished}>
            완성
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
