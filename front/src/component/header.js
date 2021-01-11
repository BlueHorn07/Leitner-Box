import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="title-box">
          <h1>Leitner Box</h1>
          <div>
            <img id={"header-img"} src={"https://t1.daumcdn.net/cfile/tistory/25680A3F57C058FF27"}/>
          </div>
        </div>
      </header>
    )
  }
}
