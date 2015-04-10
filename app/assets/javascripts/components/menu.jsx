var Menu = React.createClass({
  render: function() {
    return (
      <div className="MenuContainer">
        <MenuHeader company={this.props.company}
                    name={this.props.name}
                    email={this.props.email}
                    admin={this.props.admin} />
        <MenuContent active_path={this.props.path} />
      </div>
    );
  }
});
