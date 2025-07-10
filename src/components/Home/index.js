import Navbar from '../Navbar/index.js'
import {Link} from 'react-router-dom'
import './index.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-home-div">
        <div className="home-div">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs,salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button>Find Jobs</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
