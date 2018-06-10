import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'login error',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Log in the application</h2>
        <form onSubmit={ this.login }>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={ this.state.username }
              onChange={ this.handleLoginChange }
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={ this.state.password }
              onChange={ this.handleLoginChange }
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogsSection = () => (
      <div>
        <h2>blogs</h2>
        <form onSubmit={ this.logout }>
          <div>{ this.state.user.name } logged in&nbsp;
          <button type="submit">logout</button></div>
          <br/>
          <div>  
            { this.state.blogs.map(blog => 
              <Blog key={blog.id} blog={blog}/>
            )}
          </div>
        </form>
      </div>
    )

    return (
      <div>
        <h3>{ this.state.error }</h3>
        { this.state.user === null ? loginForm() : blogsSection() }        
      </div>
    );
  }
}

export default App;
