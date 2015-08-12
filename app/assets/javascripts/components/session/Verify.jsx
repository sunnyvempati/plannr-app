import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

var Verify = React.createClass({
  componentDidMount: function() {
    var token = this.props.query.id;
    SessionActions.verify(token);
  },
  render: function() {
    return (
      <div className="Verification">
        <div className="Verification-text">
          Verifying ...
        </div>
      </div>
    );
  }
});

export default Verify;
