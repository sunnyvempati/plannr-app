var MenuHeader = React.createClass({
  render: function() {
    return (
      <div className="MenuHeaderContainer">
        <Avatar />
        <div className="MenuHeader-name">
          {this.props.name}
        </div>
        <div className="MenuHeader-email">
          {this.props.email}
        </div>
      </div>
    );
  }
});
