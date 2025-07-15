import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails

  return (
    <div className="similar-jobs">
      <div className="company-details">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="logo"
        />
        <div>
          <h3>{title}</h3>
          <p>
            <FaStar className="star-icon" /> {rating}
          </p>
        </div>
      </div>

      <div className="similar-jobs-desc">
        <h4>Description</h4>
        <p>{jobDescription}</p>

        <div className="location-employment">
          <p>
            <IoLocation className="location-icon" /> {location}
          </p>
          <p>
            <BsFillBriefcaseFill className="briefcase-icon" /> {employmentType}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
