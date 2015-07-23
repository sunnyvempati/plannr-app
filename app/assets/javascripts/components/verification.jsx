var Verification = React.createClass({
  getText: function() {
    var email = this.props.userEmail;
    if (email) {
      return "Thanks for signing up!  We have sent an email to "+email+".  Please verify that this is you and proceed to login!"
      ;
    }
    else {
      return "If you're already verified, please click button to return to login page."
    }
  },
  goToLogin: function() {
    location.href = "/login";
  },
  render: function() {
    console.log(this.props.userEmail);
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