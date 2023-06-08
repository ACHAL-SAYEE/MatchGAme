import './index.css'
import {Component} from 'react'
import TabItem from '../TabItem'
import FruitImage from '../FruitImage'
import GameOver from '../GameOver'

class MatchGame extends Component {
  constructor(props) {
    super(props)

    this.tabsList = props.tabsList
    this.state = {
      activeTabId: props.tabsList[0].tabId,
      score: 0,
      timercount: 60,
      matchImgNo: 0,
    }
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  getFilteredImages = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props
    const filteredProjects = imagesList.filter(
      eachprojectDetails => eachprojectDetails.category === activeTabId,
    )
    return filteredProjects
  }

  tick = () => {
    this.setState(prevState => ({
      timercount: prevState.timercount - 1,
    }))
  }

  clickTabItem = tabValue => {
    this.setState({activeTabId: tabValue})
  }

  getRandomNumber = (min, max) => {
    const range = max - min + 1

    const randomNumber = Math.floor(Math.random() * range) + min

    return randomNumber
  }

  MatchImage = (matchImgNo, thumNailImgId) => {
    const {imagesList} = this.props
    if (imagesList[matchImgNo].id === thumNailImgId) {
      const newMatchImgNo = this.getRandomNumber(0, imagesList.length)
      this.setState(prevState => ({
        score: prevState.score + 1,
        matchImgNo: newMatchImgNo,
      }))
    } else {
      //   console.log('game over')
      this.setState({
        timercount: 0,
      })
    }
  }

  resetGame = () => {
    const {tabsList} = this.props
    this.setState({
      activeTabId: tabsList[0].tabId,
      score: 0,
      timercount: 60,
      matchImgNo: 0,
    })
    this.componentDidMount()
  }

  render() {
    const {activeTabId, timercount, score, matchImgNo} = this.state
    const {tabsList, imagesList} = this.props
    const filteredImages = this.getFilteredImages()
    let displayEl = null
    if (timercount === 0) {
      clearInterval(this.timerID)
      displayEl = <GameOver resetGame={this.resetGame} score={score} />
    } else {
      displayEl = (
        <div className="main-game-container">
          <img
            src={imagesList[matchImgNo].imageUrl}
            className="matchImg"
            alt="match"
          />

          <ul className="tabs-container">
            {tabsList.map(tabDetails => (
              <TabItem
                key={tabDetails.tabId}
                tabDetails={tabDetails}
                clickTabItem={this.clickTabItem}
                isActive={activeTabId === tabDetails.tabId}
              />
            ))}
          </ul>
          <ul className="images-list-container">
            {filteredImages.map(Image => (
              <FruitImage
                key={Image.thumbnailUrl}
                Image={Image}
                MatchImage={this.MatchImage}
                matchImgNo={matchImgNo}
              />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="bg-container">
        <nav>
          <div className="game-header">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="logo"
              />
            </div>
            <ul className="pointsscore">
              <li>
                <p>Score:{score}</p>
              </li>
              <div className="timer">
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                    alt="timer"
                  />
                </li>
                <li>
                  <p>{timercount} sec</p>
                </li>
              </div>
            </ul>
          </div>
        </nav>
        {displayEl}
      </div>
    )
  }
}
export default MatchGame
