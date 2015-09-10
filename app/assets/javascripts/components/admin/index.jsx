import React from 'react';
import AdminStore from '../../stores/AdminStore';
import AdminActions from '../../actions/PlannrAdminActions'
import PageHeader from '../../components/generic/PageHeader';
import AuthenticatedComponent from '../mixins/AuthenticatedComponent'

var Admin = React.createClass({
  getInitialState() {
    return {users: [], companies: []};
  },
  componentDidMount() {
    AdminStore.addChangeListener(this._onAdminInfoChange);
    AdminActions.getUserInfos();
    AdminActions.getCompanyInfos();
  },
  componentWillUnmount() {
    AdminStore.removeChangeListener(this._onAdminInfoChange);
  },
  render() {
    return <div>{this._renderContent()}</div>
  },
  _renderContent() {
    var currentUser = this.props.currentUser;
    if( currentUser && currentUser.admin ) {
      return(
        <PageHeader header="Plannr Admin"
                    profile={currentUser.profile}
                    email={currentUser.email}/>
      );
    }
  },
  _onAdminInfoChange() {
    this.setState({users: AdminStore.userInfos, companies: AdminStore.companyInfos});
  }
});

export default AuthenticatedComponent(Admin);
