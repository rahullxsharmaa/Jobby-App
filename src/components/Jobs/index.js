import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Navbar from '../Navbar'
import ResultSection from '../ResultSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

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
    this.setState({search: event.target.value})
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
      <button type="button" onClick={this.fetchingUserDetails}>
        Retry
      </button>
    </div>
  )

  jobListFailureView = () => (
    <div className="job-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.fetchingAllJobs}>
        Retry
      </button>
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
      } else {
        this.setState({profileLoadingStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({profileLoadingStatus: apiStatusConstants.failure})
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
    this.setState({salaryRange: event.target.value}, this.fetchingAllJobs)
  }

  renderJobList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }

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
        return this.jobListFailureView()
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
              <ul>
                {employmentTypesList.map(type => (
                  <li key={type.employmentTypeId}>
                    <input
                      id={type.employmentTypeId}
                      type="checkbox"
                      name="employment"
                      value={type.employmentTypeId}
                      onChange={this.gettingEmploymentType}
                    />
                    <label htmlFor={type.employmentTypeId}>{type.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-range">
              <p>Salary Range</p>
              <ul>
                {salaryRangesList.map(range => (
                  <li key={range.salaryRangeId}>
                    <input
                      type="radio"
                      id={range.salaryRangeId}
                      value={range.salaryRangeId}
                      onChange={this.gettingSalaryRange}
                      name="salary"
                    />
                    <label htmlFor={range.salaryRangeId}>{range.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-job-div">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={this.updatingSearchBox}
                onKeyDown={this.handleSearchKeyPress}
              />
              <button
                onClick={this.fetchingAllJobs}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
