import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {userId: '', userPin: '', showError: false, errorText: ''}

  onUserIdChange = event => {
    this.setState({userId: event.target.value})
  }

  onUserPinChange = event => {
    this.setState({userPin: event.target.value})
  }

  onSubmitFailure = error => {
    this.setState({showError: true, errorText: error})
  }

  onSubmitSuccess = token => {
    const {history} = this.props

    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitClicked = async event => {
    event.preventDefault()

    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const apiurl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiurl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, userPin, showError, errorText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="first-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="website-logo"
            />
          </div>
          <div className="second-container">
            <form className="form-container" onSubmit={this.onSubmitClicked}>
              <h1 className="login-heading">Welcome Back</h1>
              <div className="input-container">
                <label htmlFor="userid" className="label">
                  User ID
                </label>
                <br />
                <input
                  id="userid"
                  placeholder="Enter User ID"
                  className="input-el"
                  type="text"
                  onChange={this.onUserIdChange}
                  value={userId}
                />
              </div>
              <div className="input-container">
                <label htmlFor="pin" className="label">
                  PIN
                </label>
                <br />
                <input
                  id="pin"
                  placeholder="Enter PIN"
                  className="input-el"
                  type="password"
                  onChange={this.onUserPinChange}
                  value={userPin}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="submit-btn">
                  Login
                </button>
                {showError && <p className="error-text">{errorText}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
