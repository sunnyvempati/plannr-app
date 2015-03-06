var MenuHeader = React.createClass({
  render: function() {
    return (
      <div className="MenuHeaderContainer">
        <MenuHeaderAvatar first_name={this.props.first_name}
                          last_name={this.props.last_name} />

      </div>
    );
  }
});
