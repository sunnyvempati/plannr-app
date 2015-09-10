import React from 'react';
import AdminStore from '../../stores/AdminStore';
import PageHeader from '../../components/generic/PageHeader';
import AuthenticatedComponent from '../mixins/AuthenticatedComponent'

var Admin = React.createClass({
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

  render() {
    return <div>{this._renderContent()}</div>
  }
});

export default AuthenticatedComponent(Admin);
