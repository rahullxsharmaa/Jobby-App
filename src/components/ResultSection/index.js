import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

class ResultSection extends Component {
  render() {
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = this.props

    return (
      <Link to={`/jobs/${id}`} className="link-style">
        <div className="result">
          <div className="job-info-container">
            <img
              className="logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <p>
                <FaStar /> {rating}
              </p>
            </div>
          </div>

          <div className="location-job-type">
            <div className="location-div">
              <p>
                <MdLocationOn /> {location}
              </p>
              <p>
                <BsBriefcaseFill /> {employmentType}
              </p>
            </div>
            <div className="salary-div">
              <p>{packagePerAnnum}</p>
            </div>
          </div>

          <hr />

          <div>
            <h1 className="description">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default ResultSection
