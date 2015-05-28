var TableAction = React.createClass({
  mixins: [ToggableMenu],
  actionMenu: function() {
    if (this.state.showMenu) {
      var menuItems = this.props.items.map(function(item) {
        return (
          <div className="TableMenu-item" onClick={item.handler} key={item.name}>
            <div className="TableMenu-itemName">
              {item.name}
            </div>
          </div>
        )
      });
      return (
        <div className="TableMenu">
          {menuItems}
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="TableActionContainer" onClick={this.toggleMenu}>
        <div className="TableSort-display u-clickable">
          <i className="fa fa-ellipsis-v tableIcon"></i>
        </div>
        {this.actionMenu()}
      </div>
    );
  }
});
