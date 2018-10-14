import '../assets/styles/footer.styl'

export default {
  data() { 
    return {
      author:'Dylan'
    }
  },
  render() { 
    return (
      <div id="footer">
        <span> hello {this.author}</span>
      </div>
    )
  }
}