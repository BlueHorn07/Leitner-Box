import React, {Component} from 'react';
import {Link} from "@material-ui/core";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <br/>
        <div>
          made by <Link href={"https://github.com/BlueHorn07"}>@BlueHorn07</Link>, 2020
        </div>
        <br/>
      </footer>
    )
  }
}

