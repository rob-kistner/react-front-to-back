import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// the parameter is the destructured user prop
// that's being passed in
//
const UserItem = ({ user: { login, html_url, avatar_url } }) => {

  return (
    <div className='card text-center'>
      <img src={avatar_url}
        className="round-img"
        style={{ width: '60px' }}
        alt=''
        />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`}
          className="btn btn-dark btn-sm my-1"
          >
          More
        </Link>
      </div>
    </div>
  )

}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem
