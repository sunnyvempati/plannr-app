import PageTitleActions from '../../actions/PageTitleActions';
import InviteUsers from './InviteUsers';
import CompanyUserList from './CompanyUserList';

var Company = React.createClass({
  componentDidMount: function() {
    PageTitleActions.setPageTitle(this.props.user.company_name, true);
  },
  render: function() {
    return (
      <div className="Company">
        <InviteUsers />
        <CompanyUserList />
      </div>
    );
  }
});

export default Company;
