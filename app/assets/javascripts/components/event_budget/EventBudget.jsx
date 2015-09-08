import {RouteHandler} from 'react-router';
import RouteActions from '../../actions/RouteActions';
import DropdownMenu from '../generic/DropdownMenu';

var EventBudget = React.createClass({
  getAddNewItems() {
    return [
      {name: "Budget Category", handler: this.goToAddCategory}
    ]
  },
  goToAddCategory() {
    let props = {id: this.props.params.id};
    RouteActions.redirect('expense_category_form_new', props);
  },
  render: function() {
    return (
      <div className="EventTableContainer">
        <div className="Table-sidebarContainer">
          <div className="SideBarIconWithName u-clickable" onClick={this.goToAddCategory}>
            <i className="fa fa-plus Nav-icon"></i>
            <div className="Nav-name">Add New Category</div>
          </div>
        </div>
        <RouteHandler ref="routeHandler" eventId={this.props.params.id} />
      </div>
    );
  }
});

export default EventBudget;
