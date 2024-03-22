import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

const getAllViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Home extends Component {
  state = {activeView: getAllViews.initial, coursesData: []}

  componentDidMount() {
    this.fetchCourses()
  }

  fetchCourses = async () => {
    this.setState({activeView: getAllViews.in_progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const formatData = data.courses.map(items => ({
        id: items.id,
        name: items.name,
        logoUrl: items.logo_url,
      }))
      this.setState({activeView: getAllViews.success, coursesData: formatData})
    } else {
      this.setState({activeView: getAllViews.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {coursesData} = this.state
    return (
      <div className="courses-container">
        <h1>Courses</h1>
        <ul className="courses-ul">
          {coursesData.map(items => (
            <Link to={`/courses/${items.id}`} className="link-style">
              <li key={items.name}>
                <img src={items.logoUrl} alt={items.name} />
                <p>{items.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  retry = () => this.setState({activeView: getAllViews.success})

  renderFailure = () => (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.retry} className="retry">
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {activeView} = this.state
    switch (activeView) {
      case getAllViews.success:
        return this.renderSuccess()
      case getAllViews.in_progress:
        return this.renderLoader()
      case getAllViews.failure:
        return this.renderFailure()
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderSwitch()}
      </div>
    )
  }
}
export default Home
