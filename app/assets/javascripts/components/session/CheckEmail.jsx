import Button from '../generic/Button';
import RouteActions from '../../actions/RouteActions';

var CheckEmail = React.createClass({
  getText: function() {
    var email = this.props.query.email;
    if (email) {
      return "Thanks for signing up!  We have sent an email to "+email+".  Please verify that this is you and proceed to login!"
      ;
    }
    else {
      return "If you're already verified, please click button to return to login page."
    }
  },
  goToLogin: function() {
    RouteActions.redirect('login');
  },
  render: function() {
    return (
      <div className="Verification">
        <div className="Verification-text">
          {this.getText()}
        </div>
        <div className="Verification-btn">
          <Button type="button" onClick={this.goToLogin} className="Button--affirmative">Back to Login page</Button>
        </div>
      </div>
    );
  }
});

export default CheckEmail;
