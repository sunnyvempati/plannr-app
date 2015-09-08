import CheckboxInput from '../generic/CheckboxInput';
import ReactIntl from 'react-intl';
import DropdownMenu from '../generic/DropdownMenu';

var Payment = React.createClass({
  actionItems() {
    return [
      {name: "Edit", handler: this.handleEdit},
      {name: "Delete", handler: this.handleDelete}
    ];
  },
  getRowActionMenu() {
    var globalItems = this.actionItems().map((item) => {
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
  handleActionClick(item) {
    item.handler(this.props.data.id);
  },
  getActionTrigger() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v PaymentActionIcon"></i>
      </div>
    )
  },
  handleEdit(id) {

  },
  handleDelete(id) {

  },
  render() {
    let p = this.props.data;
    return (
      <div className="Payment">
        <div className="Payment-check">
          <CheckboxInput onChange={this.paidChanged}
                         value={p.id}
                         checked={!!p.paid_date}
                         rounded={true} />
        </div>
        <div className="Payment-details">
          <div className="Info">
            <div className="Display">Due</div>
            <div className="Content">{p.due_date}</div>
          </div>
          <div className="Info">
            <div className="Display">Paid</div>
            <div className="Content">{p.paid_date}</div>
          </div>
          <div className="Info">
            <div className="Display">Amount</div>
            <div className="Content">{p.amount}</div>
          </div>
          <div className="Info">
            <div className="Display">Type</div>
            <div className="Content">{p.type_display}</div>
          </div>
        </div>
        <div className="Payment-actions">
          <DropdownMenu trigger={this.getActionTrigger()}
                        customOptions={this.getRowActionMenu()}
                        align="right" />
        </div>
      </div>
    );
  }
});

export default Payment;
