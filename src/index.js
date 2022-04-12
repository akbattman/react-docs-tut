import React from 'react';
// import ReactDOM from 'react-dom'; // deprecated
import { createRoot } from 'react-dom/client'; // react v18 pref
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
      onClick={props.onClick} // NB. shortened bracket req' syntax without this. 
    >
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  // // ## replaced in game class for full control and history implementation
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null), // initial board state to lift child state and pass back props
  //     xIsNext: true, // player turn boolean state
  //   };
  // }

  // // on click handler method
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O'; // ternary reading boo val on prop
  //   this.setState({
  //     squares: squares,
  //     xIsNext : !this.state.xIsNext, //flip boolean value with click
  //   });
  // }

  renderSquare(i) {
    // return <Square value={i} />; // value is a "Prop" (property)
    // return <Square value={this.state.squares[i]} />; // modified for prop passing from squares state
    return (
      <Square 
        // value={this.state.squares[i]} 
        value={this.props.squares[i]}
        // onClick={()=> this.handleClick(i)}
        onClick={()=> this.props.onClick(i)}
      />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   // status = 'Winner: ' + winner; // personal pref' for interp' over concat'
    //   status = `Winner: ${winner}`
    // } else {
    //   // const status = 'Next player: X';
    //   // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // tut docs ternary reading boo val on prop
    //   status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`; // personal pref' for interp' over concat'
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
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
  // new constructor to give game control of the board
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // ternary reading boo val on prop
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length, // update turn history count 
      xIsNext: !this.state.xIsNext // flip boolean value with click
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0 // decipher next turn with odd/even boolean
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber]; // index of move history array
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move)=> {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>  
        </li>
        );
    });

    let status;
    if (winner) {
      // status = 'Winner: ' + winner; // personal pref' for interp' over concat'
      status = `Winner: ${winner}`
    } else {
      // const status = 'Next player: X';
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // tut docs ternary reading boo val on prop
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`; // personal pref' for interp' over concat'
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// // ## deprecated <18 - will behave as 17
// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
// ##

// ## react >v18 syntax
// const contain = document.querySelector('body'); // strongly discouraged
const contain = document.getElementById('root'); // would be a APP container in a working production
const root = createRoot(contain);
root.render(<Game />);

//helper func
function calculateWinner(squares) { // old syntax readable pre-initialization ?? ##REVISE##
// const calculateWinner = (squares)=> { // arrow syntax cannot be accessed before initialization Board.render(line 96)  ##bc func is const?##
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
