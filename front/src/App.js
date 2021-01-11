import React, {Component} from 'react';
import Header from './component/header'
import Footer from './component/footer'
import Article from './component/article'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Article></Article>
        <Footer></Footer>
      </div>
    )
  }
}
