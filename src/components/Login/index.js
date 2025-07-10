import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="main-form-div">
        <div className="form-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form" onSubmit={this.onSubmit}>
            <div className="credential">
              <label htmlFor="userName">USERNAME</label>
              <input
                onChange={this.onChangeUsername}
                id="userName"
                type="text"
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="credential">
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.onChangePassword}
                id="password"
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <div>
              <button className="sub-btn" type="submit">
                Login
              </button>
            </div>
            <div className="error-msg-container">
              {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
