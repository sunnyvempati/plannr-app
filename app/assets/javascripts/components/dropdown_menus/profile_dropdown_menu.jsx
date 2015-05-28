var ProfileDropdownMenu = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },
  test: function() {
    console.log(this.getDOMNode());
    console.log(document.activeElement);
  },
  getItems: function() {
    return [
      {actionName: 'test', handler: this.test}
    ]
  },
  getTrigger: function() {
    return (
      <div className="ProfileTrigger">
        {this.props.name}
        <i className="fa fa-chevron-down ProfileIcon"></i>
      </div>
    )
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    items={this.getItems()}
                    triggerClass="ProfileTrigger" />
    );
  }
});