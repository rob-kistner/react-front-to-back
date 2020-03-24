import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  // brackets allow you to access form control 'name's
  // for setState
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light')
    } else {
      this.props.searchUsers(this.state.text)
      this.setState({ text: '' })
    }
  }

  render() {
    // destruct to pull out prop functions
    const { showClear, clearUsers } = this.props

    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search users"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {// show clear button only if this.props.showClear is true
        showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    )
  }
}

export default Search
