import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
// import Topics from './components/Topics'
import QuizOrTopic from './components/QuizOrTopic'
import TopicsList from './components/TopicsList'
import './App.css';

class App extends Component {
  state = {
    topics: [],
    auth: {
      currentUser: {}
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/topics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(r => r.json())
      .then(res => this.setState({
        topics: res
      }, () => console.log(this.state))
    )

  }

  handleLogin = (user) => {
   this.setState({
       auth: {
         currentUser: user
       }
     }, () => {
       localStorage.setItem('token', user.id)
     })
  }

   handleLogout = () => {
     this.setState({
       auth: {
         currentUser: {}
       }
     })
     localStorage.clear()
   }

  render() {
    return (
      <Router>
        <div>
          <NavBar currentUser={this.state.auth.currentUser} />
          <main>
            <Route exact path="/" render={() => <HomePage handleLogin={this.handleLogin}/>}/>
            <Route
              exact path="/topics/:title"
              render={ (props) => <QuizOrTopic {...props} topics={this.state.topics} /> }/>
             <Route exact path="/topics" render={(props) => <TopicsList {...props} topics={this.state.topics} />}/>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
