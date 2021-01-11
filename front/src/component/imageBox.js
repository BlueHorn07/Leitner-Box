import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import axios from 'axios';

export default class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: false,
      box_id: 1,
      imageCard: null,
      boxBoard: null,
      image: '',
      answer: ''
    }
  }

  async componentDidMount() {
    const response_box = await axios.get(`${process.env.REACT_APP_API_URL}/imageBox/${this.state.box_id}`);
    this.setState({imageCard: (response_box.status === 200) ? response_box.data : null});

    const response_board = await axios.get(`${process.env.REACT_APP_API_URL}/imageBox/board`);
    this.setState({boxBoard: (response_board.status === 200) ? response_board.data : null});
  }

  showAnswer = () => {
    if (this.state.imageCard) {
      this.setState({mode: !(this.state.mode)});
    }
  }

  successOnCard = async () => {
    if (this.state.imageCard) {
      await axios.get(`${process.env.REACT_APP_API_URL}/imageBox/succ/${this.state.imageCard.id}`);
    }
    await this.setState({mode: false});
    this.componentDidMount();
  }

  failOnCard = async () => {
    if (this.state.imageCard) {
      await axios.get(`${process.env.REACT_APP_API_URL}/imageBox/fail/${this.state.imageCard.id}`);
    }
    await this.setState({mode: false});
    this.componentDidMount();
  }

  changeBoxId = async (id) => {
    await this.setState({box_id: id, mode: false});
    this.componentDidMount();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fileHandler = (e) => {
    this.setState({
      image: e.target.files[0]
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData()
    data.append('image', this.state.image);
    data.append('answer', this.state.answer);

    await axios.post(`${process.env.REACT_APP_API_URL}/imageBox`, data);
    await this.setState({image: '', answer: ''});
    e.target.reset();
    this.componentDidMount();
  }

  render() {
    return (
      <div>
        <h2>이미지 상자</h2>
        <details>
          <summary>이미지 카드 등록</summary>
          <form onSubmit={this.onSubmit}>
            <label>
              <p>Image: <input type="file" onChange={this.fileHandler}/></p>
            </label>
            <label>
              <p>Answer: <input type={"text"} name={"answer"} value={this.state.answer} onChange={this.onChange}/></p>
            </label>
            <input type="submit" value={"등록"}/>
          </form>
        </details>
        <br/>
        <div>
          <div>
            {!this.state.boxBoard ? "loading" : (
              Object.keys(this.state.boxBoard).map((key) => (
                <span key={key} style={{margin: "5px"}}>
                <span onClick={() => this.changeBoxId(key)}>
                  [{key}]
                </span>: {this.state.boxBoard[key]}/{key * 10}</span>
              ))
            )}
          </div>
          <p>카드 상자를 선택해주세요! ( 현재: {this.state.box_id} )</p>
          <div className={"imageCard"}>
            {!this.state.imageCard ? <span className={"imageCard"}>"상자가 비었습니다."</span> : <img className={"Image"}
                                                                                              src={`${process.env.REACT_APP_API_URL}/imageBox/image/${this.state.imageCard.img_path}`}
                                                                                              alt="imageCard"/>}
          </div>
          <Button style={btnStyle} variant="contained"
                  onClick={this.showAnswer}>{(this.state.mode) ? (this.state.imageCard.answer) : "정답확인"}</Button>
          <div>
            <Button style={btnStyle} variant="contained" color="primary" onClick={this.successOnCard}>정답!</Button>
            <Button style={btnStyle} variant="contained" color="secondary" onClick={this.failOnCard}>오답!</Button>
          </div>
        </div>
      </div>
    )
  }
}

const btnStyle = {
  padding: ".375rem .75rem",
  margin: "0.5rem 1.0rem",
  borderRadius: ".25rem",
  fontSize: "1rem",
  lineHeight: 1.2,
}
