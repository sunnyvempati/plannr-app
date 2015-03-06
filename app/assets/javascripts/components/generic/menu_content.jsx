var MenuContent = React.createClass({
  render: function() {
    var path = this.props.path;
    var menu_items = this.props.menu_items.map(function(menu_item) {
      return (
        <MenuItem item={menu_item} isSelected={menu_item.href == path} />
      );
    });
    return (
      <div class="MenuContainer-menuList">{menu_items}</div>
    );
  }
});
