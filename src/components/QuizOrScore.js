import React, { Component } from 'react'

import QuestionCard from './QuestionCard'
import ScoreCard from './ScoreCard'
import Timer from './Timer'


class QuizOrScore extends Component {

  state = {
    quiz: [],
    currentQ: 0,
    time: 60,
    lastAnswer: 60,
    score: 0
  }

  componentDidMount() {
    fetch('http://localhost:3000/questions')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({quiz: resp})
        return resp
      })
      .then(console.log)
  }

  nextQ = () => {
    this.setState((prevState) => ({currentQ: ++prevState.currentQ}))
  }


  checkAnswer = (answer) => {
    let bonus = 6 - (this.state.lastAnswer - this.state.time)
    bonus =  (bonus < 0) ? 1 : bonus
    let score = this.state.score + (bonus * 100)
    this.setState({
      score,
      lastAnswer: this.state.time
    })

    this.nextQ()
  }

  tick = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => ({time: --prevState.time}))
    }, 1000)
    setTimeout(() => {
      clearInterval(this.timerId)
    }, 60000)
  }

  killTime = () => {
    clearInterval(this.timerId)
  }

  render(){
    const {quiz, currentQ, time} = this.state
    console.log(this.state.score);
    return(
      <div>
        { currentQ < 20 && time > 0 ? (
          <div>
            <Timer time={time} tick={this.tick}/>
            <QuestionCard quesObj={quiz[currentQ]} checkAnswer={this.checkAnswer} />
          </div>
        ) : (
          <ScoreCard
            killTime={this.killTime}
            toggleQuiz={this.props.toggleQuiz}
            restartQuiz={this.props.restartQuiz}
          />

        )}

      </div>
    )
  }
}

export default QuizOrScore;
