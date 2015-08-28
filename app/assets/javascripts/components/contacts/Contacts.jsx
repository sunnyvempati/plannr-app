import {RouteHandler} from 'react-router';
import PageTitleActions from '../../actions/PageTitleActions';

var Contacts = React.createClass({
  componentDidMount: function() {
    PageTitleActions.setPageTitle("Contacts", true);
  },
  render: function() {
    return (
      <RouteHandler />
    );
  }
});

export default Contacts;
