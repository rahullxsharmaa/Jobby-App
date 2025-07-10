import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Navbar extends Component {
  onClickLogout = props => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-container">
        <div className="logo-div">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="options-div">
          <ul>
            <li>
              <Link to="/">
                <button>Home</button>
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <button>Jobs</button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="logout-div">
          <button onClick={this.onClickLogout}>Logout</button>
        </div>
        <div className="icons-div">
          <Link to="/">
            <button>
              <AiFillHome />
            </button>
          </Link>
          <Link to="/jobs">
            <button>
              <BsBriefcaseFill />
            </button>
          </Link>

          <button onClick={this.onClickLogout}>
            <FiLogOut />
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
