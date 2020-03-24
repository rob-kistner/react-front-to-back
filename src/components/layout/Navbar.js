import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// icon & title pulled out via destructuring
// as props
//
const Navbar = ({ icon, title }) => {

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon + ' pr'} /> {title}
      </h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  )

}

Navbar.defaultProps = {
  title: 'Default Title',
  icon: 'fas fa-flag',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar
