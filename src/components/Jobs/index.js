import {Component} from 'react'
import Navbar from '../Navbar/index.js'
import ResultSection from '../ResultSection/index.js'

import {CgProfile} from 'react-icons/cg'
import {IoMdSearch} from 'react-icons/io'

import './index.css'

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
  }

  gettingEmploymentType = event => {
    const {employmentType} = this.state
    const {value, checked} = event.target
    this.setState(prevState => {
      if (checked) {
        return {employmentType: [...prevState.employmentType, value]}
      } else {
        return {
          employmentType: prevState.employmentType.filter(
            eachVal => eachVal !== value,
          ),
        }
      }
    })

    console.log(employmentType)
  }

  render() {
    return (
      <div className="main-job-container">
        <Navbar />
        <div className="job-div">
          <div className="left-job-div">
            <div className="name-card">
              <div>
                <CgProfile className="profile-pic" />
                <h1>Rahul Sharma</h1>
              </div>
              <p className="job-designation">
                Lead Software Developer and AI-ML expert
              </p>
            </div>
            <hr />
            <div className="employment-types">
              <p>Type of Employment</p>
              <form>
                <div>
                  <input
                    id="fullTime"
                    type="checkbox"
                    name="employment"
                    value="FULLTIME"
                    onChange={this.gettingEmploymentType}
                  />
                  <label htmlFor="fullTime">Full Time</label>
                </div>
                <div>
                  <input
                    id="partTime"
                    type="checkbox"
                    name="employment"
                    value="PARTTIME"
                    onChange={this.gettingEmploymentType}
                  />
                  <label htmlFor="partTime">Part Time</label>
                </div>
                <div>
                  <input
                    id="freelance"
                    type="checkbox"
                    name="employment"
                    value="FREELANCE"
                    onChange={this.gettingEmploymentType}
                  />
                  <label htmlFor="freelance">Freelance</label>
                </div>
                <div>
                  <input
                    id="internship"
                    type="checkbox"
                    name="employment"
                    value="INTERNSHIP"
                    onChange={this.gettingEmploymentType}
                  />
                  <label htmlFor="internship">Internship</label>
                </div>
              </form>
            </div>
            <hr />
            <div className="salary-range">
              <p>Salary Range</p>
              <form>
                <div>
                  <input
                    type="radio"
                    id="10LPA"
                    value="1000000"
                    name="salary"
                  />
                  <label htmlFor="10LPA">10 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="20LPA"
                    value="2000000"
                    name="salary"
                  />
                  <label htmlFor="20LPA">20 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="30LPA"
                    value="3000000"
                    name="salary"
                  />
                  <label htmlFor="30LPA">30 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="40LPA"
                    value="4000000"
                    name="salary"
                  />
                  <label htmlFor="40LPA">40 LPA and above</label>
                </div>
              </form>
            </div>
          </div>
          <div className="right-job-div">
            <div className="search-container">
              <input type="search" placeholder="Search" />
              <IoMdSearch className="search-icon" />
            </div>
            <div className="result-container">
              <ResultSection />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
