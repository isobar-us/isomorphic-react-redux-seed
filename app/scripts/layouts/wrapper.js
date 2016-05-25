import React from 'react';
import Header from './header';
import Aside from './aside';
import Footer from './footer';

export default class extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header nav={this.props.nav} />
        <div id="main">
          <section id="content">
            {this.props.main}
          </section>
          <Aside sidebar={this.props.sidebar} />
        </div>
        <Footer />
      </div>
    );
  }
}