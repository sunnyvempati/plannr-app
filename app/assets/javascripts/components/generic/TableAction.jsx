import DropdownMenu from './DropdownMenu';
import classNames from 'classnames';

var TableAction = React.createClass({
  getTrigger: function() {
    let iconClasses = classNames({
      "fa fa-ellipsis-v ActionIcon": true,
      "invert": this.props.invertColor
    })
    return (
      <div className="TableSort-display u-clickable">
        <i className={iconClasses}></i>
      </div>
    )
  },
  getItems: function() {
    return this.props.items.filter(function(item) {
      return item.massAction;
    })
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    header="Actions"
                    items={this.getItems()} />
    );
  }
});

export default TableAction;
