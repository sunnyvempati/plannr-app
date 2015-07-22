var TopMenu = React.createClass({
  goToMain: function() {
    location.href = this.props.webPath;
  },
  render: function() {
    return (
      <div className="Menu">
        <div className="Menu-logo" onClick={this.goToMain}>
        </div>
        <div className="Menu-itemContainer">
          <div className="Menu-item">
            <a href="http://plannr.wordpress.com">Blog</a>
          </div>
          <div className="Menu-item">
            <a href='/sign_up'>Free Trial</a>
          </div>
          <div className="Menu-item">
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    );
  }
});
