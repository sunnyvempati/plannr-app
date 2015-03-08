var PageHeader = React.createClass({
  signOut: function() {
    location.href="/users/sign_out"
  },
  render: function() {
    return (
      <div className="PageHeaderContainer">
        <div className="PageHeader-appBar">
          <Icon className="fa fa-search PageHeader-search" />
        </div>
        <div className="PageHeader-title">
          {this.props.name}
        </div>
      </div>
    );
  }
});