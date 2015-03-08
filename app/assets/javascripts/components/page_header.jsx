var PageHeader = React.createClass({
  signOut: function() {
    location.href="/users/sign_out"
  },
  render: function() {
    before = "background-color:#3A4042;";
    after = "background-color:pink;";
    return (
      <div className="PageHeaderContainer" data-asdf={before}>
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