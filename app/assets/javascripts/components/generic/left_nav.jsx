var LeftNav = React.createClass({
  render: function() {
    return (
      <div className="left-nav">
        <LeftNavHeader name={this.props.header_name} />
        <LeftNavList nav_items={this.props.nav_items} active_path={this.props.path} />
      </div>
    );
  }
});