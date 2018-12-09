import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      username: '',
      password: '',
      user: null,
    }
    this.newBlog = React.createRef()
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
      this.showMessage('login error')
      console.error(exception)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  showMessage = async (message) => {
    this.setState({
      message,
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createNew = async (event) => {
    event.preventDefault()
    const newBlog = await this.newBlog.current.getValue()
    const savedBlog = await blogService.createNew(newBlog)
    this.setState({ blogs: this.state.blogs.concat(savedBlog) })
    await this.newBlog.current.clear()
    this.showMessage(`a new blog '${savedBlog.title}' by ${savedBlog.author} added`)
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
        </form>
        <br/>
        <Togglable buttonLabel='new blog'>
        <h3>create new</h3>
        <form onSubmit={ this.createNew }>
        <NewBlog ref={ this.newBlog }  />
        <div>
          <button tyoe="submit">create</button>
        </div>
        </form>
        </Togglable>
        <br/>
        <div>  
          { this.state.blogs.map(blog => 
            <Blog key={ blog.id } blog={ blog }/>
          )}
        </div>
      </div>
    )

    return (
      <div>
        <Notification message={this.state.message}/>
        { this.state.user === null ? loginForm() : blogsSection() }        
      </div>
    );
  }
}

export default App;
