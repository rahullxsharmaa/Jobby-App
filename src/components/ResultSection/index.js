import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const ResultSection = () => {
  return (
    <div className="result">
      <div className="job-info-container">
        <div>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png"
            alt="logo"
          />
        </div>
        <div>
          <h1 className="job-title">Devops Engineer</h1>
          <p>
            <span>
              <FaStar />
            </span>
            4
          </p>
        </div>
      </div>
      <div className="location-job-type">
        <div className="location-div">
          <p>
            <span>
              <MdLocationOn />
            </span>
            Delhi
          </p>
          <p>
            <span>
              <BsBriefcaseFill />
            </span>
            Internship
          </p>
        </div>
        <div className="salary-div">
          <p>10 LPA</p>
        </div>
      </div>
      <hr />
      <div>
        <p className="description">Description</p>
        <p className="description">
          We’re in search of a Back-End Software Engineer that specializes in
          server-side components. In this role, you’ll primarily work in NodeJs,
          SQL Lite, Python, AWS and GO and will bring a depth of knowledge on
          basic algorithms and data structures. As a Back-End Engineer, you
          might be architecting new features for our customers.
        </p>
      </div>
    </div>
  )
}

export default ResultSection
