/* eslint-disable */
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {

  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // 2nd parameter (empty array []) allows useEffect to 
    // mimic componentDidMount, i.e.: just run once
    //
    // Also, the below eslint call keeps eslint from 
    // throwing warnings asking for getUser and getUserRepos as dependencies,
    // i.e.: defined in the 2nd parameter array. Ain't react just confusin!
    // v v v v 
    // eslint-disable-next-line
  }, [])

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user

  if (loading) return <Spinner />
    
  return (
    <>
      <Link to='/' className="btn btn-light">
        Back to Search
      </Link>
      Hireable: {' '}
      {
        hireable ? 
          <i className="fas fa-check text-success"/> : 
          <i className="fas fa-ban text-danger" />
      }
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} 
            alt="" 
            className="round-img" 
            style={{width:'150px'}}
            />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (<>
            <h3>Bio</h3>
            <p>{bio}</p>
          </>)}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong> {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  )
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
}

export default User
