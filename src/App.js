import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

import './App.css'

class App extends Component
{

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // search GitHub users
  searchUsers = async text => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&per_page=100&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({
      users: res.data.items,
      user: {},
      loading: false,
      alert: null
    })
  }

  // get a single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true })
    
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({
      user: res.data,
      loading: false,
    })
  }

  // get user's GitHub repos
  getUsersRepos = async (username) => {
    this.setState({ loading: true })
    
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({
      repos: res.data,
      loading: false,
    })
  }

  // clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  // set alert
  setAlert = (msg, type) => {
    // setting alert to the object below is a shortcut
    // to typing {msg: msg, type: type}
    this.setState({ alert: { msg, type } })
    // clear alert after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  render() {
    // destruct out the users and loading vals from this.state
    const { users, user, repos, loading } = this.state

    return (
      <Router>
        <div className="App">
          <Navbar
            title="Github Finder"
            icon="fab fa-github"
          />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about'
                component={About}
              />
              <Route exact path='/user/:login' render={props => (
                  <User {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUsersRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

}

export default App
