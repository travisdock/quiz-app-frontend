import React, { Component } from 'react'
import QuestionCard from './QuestionCard'

class QuizOrScore extends Component {

  state = {
    quiz: [],
    currentQ: 0
  }

  componentDidMount() {
    fetch('http://localhost:3000/questions')
      .then(resp => resp.json())
      .then(resp => this.setState({quiz: resp}))
  }

  nextQ = () => {
    this.setState({currentQ: ++this.state.currentQ})
  }

  render(){
    const {quiz, currentQ} = this.state
    return(
      <div>
        { }
        <QuestionCard quesObj={quiz[currentQ]} nextQ={this.nextQ} />
      </div>
    )
  }
}

export default QuizOrScore;