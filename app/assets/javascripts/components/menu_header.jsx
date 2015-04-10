var MenuHeader = React.createClass({
  render: function() {
    var subheader = this.props.admin ? <a href='/company'>{this.props.company.name}</a> : this.props.email;
    return (
      <div className="MenuHeaderContainer">
        <Avatar />
        <div className="MenuHeader-name">
          {this.props.name}
        </div>
        <div className="MenuHeader-subheader">
          {subheader}
        </div>
      </div>
    );
  }
});
