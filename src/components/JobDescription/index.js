import {Component} from 'react'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Skill from '../Skill'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDescription extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.fetchJobDetails(id)
  }

  fetchJobDetails = async id => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const skills = data.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const similarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails,
        skills,
        lifeAtCompany,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-desc-div">
        <div className="job-details">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="logo"
          />
          <div>
            <h1>{title}</h1>
            <p>
              <FaStar /> {rating}
            </p>
          </div>
        </div>

        <div className="salary-location">
          <div>
            <p>
              <IoLocation /> {location}
            </p>
            <p>
              <BsBriefcaseFill /> {employmentType}
            </p>
          </div>
          <div>{packagePerAnnum}</div>
        </div>

        <hr />

        <div className="description">
          <div className="description-header">
            <h1>Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit <FaExternalLinkAlt />
            </a>
          </div>
          <p className="description-para">{jobDescription}</p>
        </div>

        <div className="skills-container">
          <h1>Skills</h1>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill.name}>
                <Skill logo={skill.imageUrl} skill={skill.name} />
              </li>
            ))}
          </ul>
        </div>

        <div className="life-at-company">
          <h1>Life at Company</h1>
          <div className="life-company-content">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>

        <div className="similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <li key={job.id}>
                <SimilarJobs jobDetails={job} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <h1>Something went wrong</h1>
      <button type="button" onClick={this.componentDidMount}>
        Retry
      </button>
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderFinalView()}
      </div>
    )
  }
}

export default JobDescription
