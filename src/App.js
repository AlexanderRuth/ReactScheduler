import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header.js';
import VisibleBody from './Containers/VisibleBody.js';

class App extends Component {
  render() {
    return (
    	<div>
			<Header />
			<VisibleBody />
		</div>
    );
  }
}

export default App;
