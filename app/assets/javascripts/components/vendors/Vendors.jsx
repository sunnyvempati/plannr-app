import {RouteHandler} from 'react-router';
import PageTitleActions from '../../actions/PageTitleActions';

var Vendors = React.createClass({
  componentDidMount: function() {
    PageTitleActions.setPageTitle("Vendors", true);
  },
  render: function() {
    return (
      <RouteHandler />
    );
  }
});

export default Vendors;
