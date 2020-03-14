import React, { PropTypes, Component } from 'react'

class UserItem extends Component {
  
  static propTypes = {
    // user: PropTypes.object.isRequired
  };

  render() {

    const { login, html_url, avatar_url } = this.props.user;

    return (
      <div className='card text-center'>
        <img
          src={avatar_url}
          className="round-img"
          style={{ width: '60px' }}
          alt=''
          />
        <h3>{login}</h3>
        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    )
  }
  
}

export default UserItem
