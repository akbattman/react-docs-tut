import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//###########################################################################
// Square class change to Function Component as only containing render method
//###########################################################################

// class Square extends React.Component {
//   // replacing parent value prop with constructor state value

//   // construcor re-replaced with prop-pass from board game state
//   // constructor(props){
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }

//   render() {
//     return (
//       // <button className="square" onClick={function() {console.log('clicked'); }}>
//       // <button className="square" onClick={()=> console.log('clicked')}> ** arrow func syntax
//       <button
//         // readability** best prac - line by line
//         className="square" 
//         // onClick={()=> this.setState({value: 'X'})}
//         onClick={()=> this.props.onClick()}
//         >
//         {this.props.value}
//         {/* {this.state.value} */}
//       </button> // this.prop passed from 'Board' component below, hoisted to child 'Square' component
//     );
//   }
// }

//###########################################################################

// ## tut docs example - named function

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// personal pref for arrow syntax(more modern) && readability new lines
const Square = (props)=> {
  return (
    <button
      className='square'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // initial board state to lift child state and pass back props
      xIsNext: true, // player turn boolean state
    };
  }

  // on click handler method
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // ternary reading boo val on prop
    this.setState({
      squares: squares,
      xIsNext : !this.state.xIsNext, //flip boolean value with click
    });
  }

  renderSquare(i) {
    // return <Square value={i} />; // value is a "Prop" (property)
    // return <Square value={this.state.squares[i]} />; // modified for prop passing from squares state
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={()=> this.handleClick(i)}
      />
    );
  }

  render() {
    // const status = 'Next player: X';
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // tut docs ternary reading boo val on prop
    const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`; // personal pref' for interp' over concat'

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

