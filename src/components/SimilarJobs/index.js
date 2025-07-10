import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = () => {
  return (
    <div className="similar-jobs">
      <div className="company-details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png"
          alt="sample"
          className="logo"
        />
        <div>
          <p>Backend Engineer</p>
          <p>
            <span>
              <FaStar />
            </span>
            4
          </p>
        </div>
      </div>
      <div className="similar-jobs-desc">
        <h1>Description</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula,
        </p>
        <div>
          <p>
            <span>
              <IoLocation />
            </span>
            Remote
          </p>
          <p>
            <span>
              <BsFillBriefcaseFill />
            </span>
            Internship
          </p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJobs
