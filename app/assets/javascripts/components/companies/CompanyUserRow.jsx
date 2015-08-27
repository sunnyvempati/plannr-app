import CheckboxInput from '../generic/CheckboxInput';
import DropdownMenu from '../generic/DropdownMenu';
import ToggleButton from '../generic/ToggleButton';
import classNames from 'classnames';

var CompanyUserRow = React.createClass({
  getInitialState: function() {
    return {
      isAdmin: this.props.data["company_admin"]
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({isAdmin: nextProps.data.company_admin});
  },
  toggleAdmin: function(checked) {
    this.props.handleUpdate(this.props.data.id, {user: {company_admin: checked}});
  },
  handleActionClick: function(item) {
    item.handler(this.props.data.id);
  },
  getActionTrigger: function() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  getRowActionMenu: function() {
    var globalItems = this.props.actionItems.map(function(item) {
      return (
        <div className="DropdownMenu-item"
             onClick={this.handleActionClick.bind(this, item)}
             key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    return (
      <div className="TableRow-actions">
        {globalItems}
      </div>
    )
  },
  render: function() {
    var data = this.props.data;
    var rowClasses = classNames({
      'Table-row': true,
      'selected': this.props.checked
    });
    return (
      <div className={rowClasses}>
        <div className="Table-checkbox u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkChanged}
                         value={data.id}
                         checked={this.props.checked}
                         hideCheckbox={this.props.hideCheckbox} />
        </div>
        <div className="Table-rowItem u-wrapWithEllipsis u-flexGrow-10">{data.name}</div>
        <div className="Table-rowItem u-wrapWithEllipsis u-flexGrow-6">{data.email}</div>
        <div className="Table-rowItem u-wrapWithEllipsis u-flexGrow-4">
          <ToggleButton checked={this.state.isAdmin} onChange={this.toggleAdmin} />
        </div>
        <DropdownMenu trigger={this.getActionTrigger()}
                      customOptions={this.getRowActionMenu()}
                      align="right" />
      </div>
    );
  }
});

export default CompanyUserRow;
