import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar/index.js'
import ResultSection from '../ResultSection/index.js'

import {IoMdSearch} from 'react-icons/io'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    apiStatus: apiStatusConstants.initial,
    profileLoadingStatus: apiStatusConstants.initial,
    jobsList: [],
    profileDetails: {},
    search: '',
  }

  componentDidMount() {
    this.fetchingAllJobs()
    this.fetchingUserDetails()
  }

  updatingSearchBox = event => {
    const {search} = this.state
    this.setState({
      search: event.target.value,
    })
    console.log(search)
  }

  loadingFunction = () => (
    <div className="loading">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  profileFailureView = () => (
    <div>
      <button onClick={this.fetchingUserDetails}>Retry</button>
    </div>
  )

  jobListFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.fetchingAllJobs}>Retry</button>
    </div>
  )

  fetchingUserDetails = async () => {
    this.setState({profileLoadingStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedProfileDetails = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }
        this.setState({
          profileDetails: updatedProfileDetails,
          profileLoadingStatus: apiStatusConstants.success,
        })
      }
    } catch (error) {
      this.setState({profileLoadingStatus: apiStatusConstants.failure})
      console.error('Error fetching profile:', error)
    }
  }

  fetchingAllJobs = async () => {
    const {employmentType, salaryRange, search} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))
        this.setState({
          jobsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  gettingEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updatedEmployment = checked
        ? [...prevState.employmentType, value]
        : prevState.employmentType.filter(each => each !== value)

      return {employmentType: updatedEmployment}
    }, this.fetchingAllJobs)
  }

  gettingSalaryRange = event => {
    this.setState(
      {
        salaryRange: event.target.value,
      },
      this.fetchingAllJobs,
    )
  }

  renderJobList = () => {
    const {jobsList} = this.state
    return (
      <div className="result-container">
        {jobsList.map(eachJob => (
          <ResultSection
            key={eachJob.id}
            companyLogoUrl={eachJob.companyLogoUrl}
            employmentType={eachJob.employmentType}
            id={eachJob.id}
            jobDescription={eachJob.jobDescription}
            location={eachJob.location}
            packagePerAnnum={eachJob.packagePerAnnum}
            rating={eachJob.rating}
            title={eachJob.title}
          />
        ))}
      </div>
    )
  }

  profileDetail = () => {
    const {profileDetails} = this.state
    return (
      <div className="name-card">
        <div>
          <img
            src={profileDetails.profileImageUrl}
            alt="profile pic"
            className="profile-pic"
          />
          <h1>{profileDetails.name}</h1>
        </div>
        <p className="job-designation">{profileDetails.shortBio}</p>
      </div>
    )
  }
  renderJobProfile = () => {
    const {profileLoadingStatus} = this.state

    switch (profileLoadingStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingFunction()
      case apiStatusConstants.success:
        return this.profileDetail()
      case apiStatusConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  handleSearchKeyPress = event => {
    if (event.key === 'Enter') {
      this.fetchingAllJobs()
    }
  }

  renderJobContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingFunction()
      case apiStatusConstants.success:
        return this.renderJobList()
      case apiStatusConstants.failure:
        return <div className="error-msg">{this.jobListFailureView()}</div>
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div className="main-job-container">
        <Navbar />
        <div className="job-div">
          <div className="left-job-div">
            {this.renderJobProfile()}
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
                    onChange={this.gettingSalaryRange}
                    name="salary"
                  />
                  <label htmlFor="10LPA">10 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="20LPA"
                    value="2000000"
                    onChange={this.gettingSalaryRange}
                    name="salary"
                  />
                  <label htmlFor="20LPA">20 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="30LPA"
                    value="3000000"
                    onChange={this.gettingSalaryRange}
                    name="salary"
                  />
                  <label htmlFor="30LPA">30 LPA and above</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="40LPA"
                    value="4000000"
                    onChange={this.gettingSalaryRange}
                    name="salary"
                  />
                  <label htmlFor="40LPA">40 LPA and above</label>
                </div>
              </form>
            </div>
          </div>
          <div className="right-job-div">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={e => this.setState({search: e.target.value})}
                onKeyDown={this.handleSearchKeyPress}
              />

              <IoMdSearch
                onClick={this.fetchingAllJobs}
                className="search-icon"
              />
            </div>
            {this.renderJobContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
