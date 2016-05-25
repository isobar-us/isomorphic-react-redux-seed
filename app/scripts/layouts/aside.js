import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <aside>
        {this.props.sidebar}
      </aside>
    );
  }
}