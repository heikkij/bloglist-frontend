import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      showDetails: false,
    }
  }

  toggleShowDetails = () => {
    this.setState({ showDetails: !this.state.showDetails })
  }

  like = () => {
    console.log('TODO')
  }

  render() {
    const hideDetails = { display: this.state.showDetails ? 'none' : '' }
    const showDetails = { display: this.state.showDetails ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div style={hideDetails}>
          <div onClick={this.toggleShowDetails}>
          {this.state.blog.title}&nbsp;{this.state.blog.author}
          </div>  
        </div>
        <div style={showDetails}>
          <div onClick={this.toggleShowDetails}>
            {this.state.blog.title}&nbsp;{this.state.blog.author}
          </div>  
          <div><a href={this.state.blog.url}>{this.state.blog.url}</a></div>
          <div>{this.state.blog.likes} likes <button onClick={this.like}>like</button></div>
          <div>added by {this.state.blog.user.name}</div>
        </div>
      </div>
    )
  }
}

export default Blog