import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const ResultSection = props => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = props
  return (
    <div className="result">
      <div className="job-info-container">
        <div>
          <img
            className="logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
        </div>
        <div>
          <h1 className="job-title">{title}</h1>
          <p>
            <span>
              <FaStar />
            </span>
            {rating}
          </p>
        </div>
      </div>
      <div className="location-job-type">
        <div className="location-div">
          <p>
            <span>
              <MdLocationOn />
            </span>
            {location}
          </p>
          <p>
            <span>
              <BsBriefcaseFill />
            </span>
            {employmentType}
          </p>
        </div>
        <div className="salary-div">
          <p>{packagePerAnnum}</p>
        </div>
      </div>
      <hr />
      <div>
        <p className="description">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
    </div>
  )
}

export default ResultSection
