var LeftNavListItem = React.createClass({
  handleClick: function(href) {
    location.href=href;
  },
  render: function() {
    var item = this.props.item;
    var cx = React.addons.classSet;
    var item_classes = cx({
      'nav-item': true,
      'active': this.props.isSelected
    });
    return (
      <div className="left-nav list list-item" onClick={this.handleClick.bind(this, this.props.item.href)}>
        <div className={item_classes}>
          <i className={item.icon_class + " nav-item-icon"} />
          {item.name}
        </div>
      </div>
    );
  }
});