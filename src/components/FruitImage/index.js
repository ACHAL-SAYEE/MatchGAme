import './index.css'

const ProjectItem = props => {
  const {Image, MatchImage, matchImgNo} = props
  const {imageUrl} = Image

  const t = () => {
    // const {} = props
    MatchImage(matchImgNo, Image.id)
  }

  return (
    <li className="project-item-container">
      <button className="thumnailBtn" onClick={t} type="button">
        <img className="project-item-image" src={imageUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ProjectItem
