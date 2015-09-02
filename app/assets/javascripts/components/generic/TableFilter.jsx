import DropdownMenu from './DropdownMenu';
import classNames from 'classnames';

var TableFilter = React.createClass({
  getInitialState: function() {
    return {
      activeItem: this.getDefaultItem()
    };
  },
  getDefaultItem: function() {
    return this.props.items.filter(function(item) {
      return item.default;
    })[0];
  },
  getTrigger: function() {
    let invert = this.props.invertColor;
    let displayClasses = classNames({
      'TableFilter-display': true,
      'invert': invert
    });
    let iconClasses = classNames({
      'fa fa-filter tableIcon': true,
      'invert': invert
    });
    return (
      <div className="TableFilter-trigger">
        <i className={iconClasses}></i>
        <div className={displayClasses}>
          {this.state.activeItem.name}
        </div>
      </div>
    )
  },
  handleFilterClick: function(item) {
    this.setState({activeItem: item});
    item.handler();
  },
  getItems: function() {
    var filterItems = this.props.items.map(function(item) {
      return (
        <div className="DropdownMenu-item" onClick={this.handleFilterClick.bind(this, item)} key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    return (
      <div className="TableFilter-options">
        {filterItems}
      </div>
    )
  },
  render: function() {
    return (
      <div className="TableFilter">
        <DropdownMenu trigger={this.getTrigger()}
                      customOptions={this.getItems()}
                      header="Filter by:" />
      </div>
    );
  }
});

export default TableFilter;
