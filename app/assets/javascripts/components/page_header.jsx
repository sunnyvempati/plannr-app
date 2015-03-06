var PageHeader = React.createClass({
  signOut: function() {
    location.href="/users/sign_out"
  },
  render: function() {
    return (
      <div className="PageHeader">
        <div className="PageHeader-title">
          {this.props.name}
        </div>
        <div className="PageHeader-appBar">
          <i className="fa fa-sign-out sign-out" onClick={this.signOut}></i>
        </div>
      </div>
    );
  }
});