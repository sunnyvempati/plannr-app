import RouteActions from '../../actions/RouteActions';
import UserActions from '../../actions/UserActions';
import SessionStore from '../../stores/SessionStore';
import UserStore from '../../stores/UserStore';

export default (PrivateComponent) => {
  return class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      if (!SessionStore.isLoggedIn()) {
        // let transitionPath = transition.path;

        // RouteActions.storeTransitionPath(transitionPath);

        RouteActions.redirect('login');
      }
    }

    constructor() {
      super();
      this.state = this._getSessionState();
    }

    _getSessionState() {
      return {
        userLoggedIn: SessionStore.isLoggedIn(),
        user: UserStore.currentUser
      }
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      SessionStore.addChangeListener(this.changeListener);
      UserStore.addChangeListener(this.changeListener);
      if (SessionStore.userId) UserActions.get(SessionStore.userId);
    }

    _onChange() {
      this.setState(this._getSessionState());
    }

    componentWillUnmount() {
      SessionStore.removeChangeListener(this.changeListener);
      UserStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <PrivateComponent
        {...this.props}
        currentUser={this.state.user}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
}

