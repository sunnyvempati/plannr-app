var Menu = React.createClass({
  render: function() {
    return (
      <div className='MenuContainer'>
        <MenuHeader email={this.props.email}
                    name={this.props.name} />
        <MenuContent active_path={this.props.path} />
      </div>
    );
  }
});
