import React, {Component} from 'react';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import './App.css';

class App extends Component
{
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // search GitHub users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&per_page=100&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    console.log(res.data.items.length)
    
    this.setState({
      users: res.data.items,
      loading: false,
      alert: null,
    });
  }
  
  // clear users from state
  clearUsers = () => {
    this.setState( { users: [], loading: false } );
  }

  // set alert
  setAlert = (msg, type) => {
    // setting alert to the object below is a shortcut
    // to typing {msg: msg, type: type}
    this.setState( { alert: {msg, type} } );
    // clear alert after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 3000);
  }

  render () {
    // destruct out the users and loading vals from this.state
    const { users, loading } = this.state

    return (
      <div className='App'>
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
            />
          <Users
            loading={loading}
            users={users}
            />
        </div>
      </div>
    );
  }
}

export default App;
