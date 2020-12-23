import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';

class App extends Component {

  state = {
    numbers: {}
  }

  saveNumber(number) {
    const theNumber = !this.state.numbers.first ? 'first' : 'second'; const other = this.state.numbers.first ? 'first' : 'second';
    this.setState({
      numbers: {
        [theNumber]: number,
        [other]: this.state.numbers[other]
      }//,
      // clearInput: ''
    });
  }


  math(operation) {
    this.setState({
      math: operation
    });
  }

  calculate = () => {
    const { first, second } = this.state.numbers;
    const operation = this.state.math;
    let theResult;
    switch (operation) {
      case '+':
        theResult = Number(first) + Number(second);
        break;
      case '-':
        theResult = Number(first) - Number(second);
        break;
      case '*':
        theResult = Number(first) * Number(second);
        break;
      case '/':
        theResult = Number(first) / Number(second);
        break;
      case '^':
        theResult = Math.pow(Number(first), Number(second));
        break;
      default:
        break;
    }

    this.setState({
      numbers: {
        result: theResult
      }
    });
  };

  render() {

    let showResults = this.state.numbers.result ? <main>RESULTS: &nbsp;{this.state.numbers.result}</main> : null;

    return (
      <div className="App">
        <input className="input" onBlur={({ target: t }) => this.saveNumber(t.value)}/* value={this.state.clearInput}*/ />
        <button onClick={({ target: t }) => this.math(t.innerText)}>+</button>
        <button onClick={({ target: t }) => this.math(t.innerText)}>-</button>
        <button onClick={({ target: t }) => this.math(t.innerText)}>*</button>
        <button onClick={({ target: t }) => this.math(t.innerText)}>/</button>
        <button onClick={({ target: t }) => this.math(t.innerText)}>^</button>
        <button onClick={this.calculate}>=</button>
        {showResults}
      </div>
    );
  }
}

export default App;
