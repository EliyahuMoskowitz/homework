import './App.css';
import React, { Component } from 'react';
import CalcInput from './CalcInput';
import DoMath from './DoMath';

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

    handleBlur = value => this.saveNumber(value);

    handleClick = oper => this.math(oper);

    render() {

        let showResults = this.state.numbers.result ? <main>RESULTS: &nbsp;{this.state.numbers.result}</main> : null;

        return (
            <div className="App text-center">
                <CalcInput className="input" onBlurHandler={this.handleBlur} />
                <DoMath clickHandler={this.handleClick} display='+' />
                <DoMath clickHandler={this.handleClick} display='-' />
                <DoMath clickHandler={this.handleClick} display='*' />
                <DoMath clickHandler={this.handleClick} display='/' />
                <DoMath clickHandler={this.handleClick} display='^' />
                <DoMath clickHandler={this.calculate} display='=' />
                {showResults}
            </div>
        );
    }
}

export default App;
