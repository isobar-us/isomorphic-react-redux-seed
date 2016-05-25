import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <header>
        <div><h1>&#60;codetest&#62;</h1></div>
        {this.props.nav}
      </header>
    );
  }
}