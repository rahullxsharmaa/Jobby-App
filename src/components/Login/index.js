import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = event => {
    const {username, password} = this.state
    event.preventDefault()
    console.log(username)
    console.log(password)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password} = this.state

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
          </form>
        </div>
      </div>
    )
  }
}

export default Login
