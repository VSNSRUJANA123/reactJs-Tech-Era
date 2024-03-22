import Header from '../Header'

const NotFound = () => (
  <div>
    <Header />
    <p className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </p>
  </div>
)
export default NotFound
