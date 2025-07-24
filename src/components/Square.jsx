import React from 'react';
import knightIcon from '../assets/knight.png';

function Square(props) {
  let className = 'square';
  if (props.isDark) {
    className += ' dark';
  }
  if (props.isPossibleMove && !props.value) {
    className += ' possible-move';
  }

  const knightImage = <img src={knightIcon} alt="Knight" style={{ width: '50px', height: '50px', position: 'relative', top: '3px' }} />;

  return (
    <button className={className} onClick={props.onClick}>
      {props.value === 'N' ? knightImage : props.value}
      {props.hint !== undefined && <span className="hint">{props.hint}</span>}
    </button>
  );
}

export default Square;