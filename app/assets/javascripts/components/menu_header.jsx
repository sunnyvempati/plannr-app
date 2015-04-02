var MenuHeader = React.createClass({
  render: function() {
    var company_href = "/company";
    return (
      <div className="MenuHeaderContainer">
        <Avatar />
        <div className="MenuHeader-name">
          {this.props.name}
        </div>
        <div className="MenuHeader-company">
          <a href={company_href}>{this.props.company.name}</a>
        </div>
      </div>
    );
  }
});
