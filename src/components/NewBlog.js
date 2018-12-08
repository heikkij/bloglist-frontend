import React from 'react'
import blogService from '../services/blogs'

class NewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createNew = async (event) => {
    event.preventDefault()
    const saved = await blogService.createNew({
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    })
    this.setState({
      title: '',
      author: '',
      url: '',
    })
    return saved
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr><td>title:</td><td><input name="title" value={this.state.title} onChange={this.onChange} /></td></tr>
            <tr><td>author:</td><td><input name="author" value={this.state.author} onChange={this.onChange} /></td></tr>
            <tr><td>url:</td><td><input name="url" value={this.state.url} onChange={this.onChange} /></td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default NewBlog