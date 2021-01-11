import React, {Component} from 'react';
import WordBox from "./wordBox";
import ImageBox from "./imageBox";

export default class Article extends Component {
  render() {
    return (
      <article>
        <WordBox/>
        <br/>
        <hr/>
        <ImageBox/>
      </article>
    )
  }
}

