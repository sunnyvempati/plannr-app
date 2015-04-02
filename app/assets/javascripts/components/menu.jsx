var Menu = React.createClass({
  render: function() {
    return (
      <div className="MenuContainer">
        <MenuHeader company={this.props.company}
                    name={this.props.name} />
        <MenuContent active_path={this.props.path} />
      </div>
    );
  }
});
