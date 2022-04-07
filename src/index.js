import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // replacing parent value prop with constructor state value
  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      // <button className="square" onClick={function() {console.log('clicked'); }}>
      // <button className="square" onClick={()=> console.log('clicked')}> ** arrow func syntax
      <button
        // readability** best prac
        className="square" 
        onClick={()=> this.setState({value: 'X'})}
        >
        {this.state.value}
        {/* {this.props.value} */}
      </button> // this.prop passed from 'Board' component below, hoisted to child 'Square' component
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; // value is a "Prop" (property)
  }

  render() {
    const status = 'Next player: X';

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

