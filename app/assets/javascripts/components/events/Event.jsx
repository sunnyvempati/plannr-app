import classNames from 'classnames';
import ReactIntl from 'react-intl';
import {Link} from 'react-router';
import EventStore from '../../stores/EventStore';
import EventExpenseCategoryStore from '../../stores/EventExpenseCategoryStore';

var Event = React.createClass({
  getDefaultProps: function() {
    return {
      editable: true
    };
  },
  getInitialState: function() {
    let event = this.props.model;
    return {
      budget: EventStore.getBudgetTotals(event.id)
    };
  },
  componentDidMount: function() {
    EventExpenseCategoryStore.addChangeListener(this._onCategoryChange);
  },
  componentWillUnmount: function() {
    EventExpenseCategoryStore.removeChangeListener(this._onCategoryChange);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setBudget(nextProps.model.id);
  },
  _onCategoryChange() {
    this.setBudget(this.props.model.id);
  },
  setBudget(eventId) {
    this.setState({budget: EventStore.getBudgetTotals(eventId)});
  },
  propTypes: {
    model: React.PropTypes.object
  },
  renderDate: function(date) {
    if (date) {
      return (
        <ReactIntl.FormattedDate
          day="numeric"
          month="long"
          year="numeric"
          value={date} />
      );
    } else {
      return "Not specified";
    }
  },
  renderDescription: function(desc) {
    if (this.props.editable) {
      return (
        <div className="Event-descriptionContainer">
          <div className="Event-descTitle">
            Description
          </div>
          <div className="Event-desc u-wrapWithEllipsis">
            {desc}
          </div>
        </div>
      );
    }
  },
  render: function () {
    var event = this.props.model;
    var editClasses = classNames({
      'Event-edit': true,
      'u-flexGrow-4': true,
      'u-hidden': !this.props.editable
    });
    var client = event.client;
    var clientName = "", clientOrg = "", clientEmail = "", clientPhone = "";
    if (!!client) {
      clientName = client.name;
      clientOrg = client.organization;
      clientEmail = client.email;
      clientPhone = client.phone;
    }
    var containerClasses = classNames({
      'Event-infoContainer': true,
      'is-described': this.props.editable
    });
    let budgetTotals = this.state.budget;
    return (
      <div className="EventContainer">
        <div className="Event-infoContainer">
          <div className="Event-info u-flexGrow-2 Event-client">
            <div className="Info-header">
              Client
            </div>
            <div className="Info-content">
              <div className="u-bold u-wrapWithEllipsis">{clientName}</div>
              <div className="u-wrapWithEllipsis">{clientOrg}</div>
              {clientEmail}<br />
              {clientPhone}
            </div>
          </div>
          <div className="Event-info u-flexGrow-2">
            <div className="Info-header">
              Location
            </div>
            <div className="Info-content u-wrapWithEllipsis u-bold">
              {event.location || "Not specified"}
            </div>
          </div>
          <div className="Event-info u-flexGrow-1">
            <div className="Info-header">
              Start Date
            </div>
            <div className="Info-content u-wrapWithEllipsis u-bold">
              {this.renderDate(event.start_date)}
            </div>
          </div>
          <div className="Event-info u-flexGrow-1">
            <div className="Info-header">
              End Date
            </div>
            <div className="Info-content u-wrapWithEllipsis u-bold">
              {this.renderDate(event.end_date)}
            </div>
          </div>
          <div className="Event-info u-flexGrow-2">
            <div className="Info-header">
              Budget
            </div>
            <div className="Info-content">
              <div className="Budget">
                <div className="Display">Total</div>
                <div className="Value">
                  <ReactIntl.FormattedNumber value={budgetTotals.total} style="currency" currency="USD" />
                </div>
              </div>
              <div className="Budget">
                <div className="Display">Estimated</div>
                <div className="Value">
                  <ReactIntl.FormattedNumber value={budgetTotals.estimated} style="currency" currency="USD" />
                </div>
              </div>
              <div className="Budget">
                <div className="Display">Expenses</div>
                <div className="Value">
                  <ReactIntl.FormattedNumber value={budgetTotals.expenses} style="currency" currency="USD" />
                </div>
              </div>
              <div className="Budget">
                <div className="Display">Remaining</div>
                <div className="Value">
                  <ReactIntl.FormattedNumber value={budgetTotals.remaining} style="currency" currency="USD" />
                </div>
              </div>
            </div>
          </div>
          <div className={editClasses}>
            <div className="Edit-btn">
              <Link to='event_edit' params={{id: event && event.id || 0}}>
                <i className="fa fa-pencil EventEditIcon"></i>
              </Link>
            </div>
          </div>
        </div>
        {this.renderDescription(event.description)}
      </div>
    );
  }
});

export default Event;
