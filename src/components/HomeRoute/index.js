import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class HomeRoute extends Component {
  onLogOutClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="home-bg-container">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
            />
          </div>
          <div className="navbar-btn-container">
            <button
              type="button"
              className="logout-btn"
              onClick={this.onLogOutClicked}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="card-container">
          <h1 className="card-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default HomeRoute
