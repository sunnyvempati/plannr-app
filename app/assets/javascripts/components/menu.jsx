var Menu = React.createClass({
  render: function() {
    return (
      <div className="MenuContainer">
        <MenuHeader name={this.props.name}
                    email={this.props.email}
                    admin={this.props.admin} />
        <MenuContent active_path={this.props.path}
                     company={this.props.company} />
      </div>
    );
  }
});
