import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const { boardConfig, squares, possibleMoves, hints, onClick } = this.props;
    const x = i % boardConfig.width;
    const y = Math.floor(i / boardConfig.width);
    const isDark = (x + y) % 2 === 1;
    const isPossibleMove = possibleMoves.includes(i);
    const hint = hints ? hints[i] : undefined;
    const isDisabled = boardConfig.disabled.includes(i);

    if (isDisabled) {
      return <div key={i} className="square disabled" />;
    }

    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isDark={isDark}
        isPossibleMove={isPossibleMove}
        hint={hint}
      />
    );
  }

  render() {
    const { boardConfig, history, isFinished, moveNumber } = this.props;
    const board = [];
    for (let i = 0; i < boardConfig.height; i++) {
      const row = [];
      for (let j = 0; j < boardConfig.width; j++) {
        row.push(this.renderSquare(i * boardConfig.width + j));
      }
      board.push(<div key={i} className="board-row" style={{ width: boardConfig.width * 60 }}>{row}</div>);
    }

    const pathLines = [];
    if (isFinished) {
      for (let i = 0; i < moveNumber - 1; i++) {
        const fromPos = history[i].knightPos;
        const toPos = history[i + 1].knightPos;

        if (fromPos !== null && toPos !== null) {
          const fromX = (fromPos % boardConfig.width) * 60 + 30;
          const fromY = Math.floor(fromPos / boardConfig.width) * 60 + 30;
          const toX = (toPos % boardConfig.width) * 60 + 30;
          const toY = Math.floor(toPos / boardConfig.width) * 60 + 30;

          pathLines.push(
            <line
              key={`path-${i}`}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              className="path-line"
            />
          );
        }
      }
    }

    return (
      <div className="board-container">
        {board}
        {isFinished && (
          <svg className="path-svg" width={boardConfig.width * 60} height={boardConfig.height * 60}>
            {pathLines}
          </svg>
        )}
      </div>
    );
  }
}

export default Board;
