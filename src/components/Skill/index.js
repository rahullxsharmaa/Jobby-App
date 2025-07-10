import './index.css'

const Skill = props => {
  const {logo, skill} = props
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png"
        alt="sample"
      />
      <p>sample skill</p>
    </div>
  )
}

export default Skill
