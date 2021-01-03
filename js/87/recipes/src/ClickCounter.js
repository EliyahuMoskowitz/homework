import React, { Component } from 'react'

export default class ClickCounter extends Component {
  /*state = {
    clicks: 0
  };*/

  constructor(props) {
    super(props);

    this.state = {
      clicks: +localStorage.getItem('count') || 0
    };

    // bind this so we have proper this when callback is called later
    // this.handleClick = this.handleClick.bind(this);
  }

  /*componentDidMount() {
    setInterval(() => {
     this.setState({clicks: this.state.clicks + 1})
    }, 1000);
  }*/

  // use experimental syntax so we have right this when called
  /*handleClick() {*/
  handleClick = async e => {
    console.log('button was clicked!', e);
    await this.setState({ clicks: this.state.clicks + 1 });
    localStorage.setItem('count', this.state.clicks);
  }
  // componentDidUpdate(){
  //   localStorage.setItem('count', this.state.clicks);
  // }

  render() {
    //console.log(this);
    return (
      <h5>
        This page has been viewed
        <button className="m-1" onClick={
          this.handleClick
          /* bind so we have correct this when called*/
          /*this.handleClick.bind(this)*/

          /* arrow function so we have correct this when called*/
          /*() => this.handleClick()*/
          }>{this.state.clicks}</button>
        times &nbsp; 
        <button onClick={() => {
          localStorage.clear();
          this.setState({clicks: 0});
        }} >
        Clear</button>
      </h5>
    )
  }
}
