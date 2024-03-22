import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

const getAllViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class CourseItem extends Component {
  state = {activeView: getAllViews.initial, coursesData: []}

  componentDidMount() {
    this.fetchCourses()
  }

  fetchCourses = async () => {
    this.setState({activeView: getAllViews.in_progress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const items = data.course_details
      const formatData = {
        id: items.id,
        name: items.name,
        imageUrl: items.image_url,
        description: items.description,
      }
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
      <div key={coursesData.name} className="course-containerList">
        <img src={coursesData.imageUrl} alt={coursesData.name} />
        <div>
          <h1>{coursesData.name}</h1>
          <p>{coursesData.description}</p>
        </div>
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
export default CourseItem
