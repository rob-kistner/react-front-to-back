/* eslint-disable */
import React, { useState, Fragment } from 'react'
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

const App = () => {
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // search GitHub users
  const searchUsers = async (text) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&per_page=100&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setUsers(res.data.items)
    setUser({})
    setAlert(null)
    setLoading(false)
  }

  // get a single GitHub user
  const getUser = async (username) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setUser(res.data)
    setLoading(false)
  }

  // get user's GitHub repos
  const getUsersRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setRepos(res.data)
    setLoading(false)
  }

  // clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // set alert
  const showAlert = (msg, type) => {
    // setting alert to the object below is a shortcut
    // to typing {msg: msg, type: type}
    setAlert({ msg, type })
    // clear alert after 5 seconds
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar
          title="Github Finder"
          icon="fab fa-github"
        />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/"
              render={props => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login"
              render={ props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUsersRepos}
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

export default App
