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
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
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

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Log in the application</h2>
        <form onSubmit={this.login}>
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
        <p>{ this.state.user.name } logged in</p>
        { this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
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
