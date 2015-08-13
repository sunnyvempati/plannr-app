import RouteActions from '../../actions/RouteActions';
import SessionStore from '../../stores/SessionStore';
import UserStore from '../../stores/UserStore';

export default (PrivateComponent) => {
  return class AuthenticatedComponent extends React.Component {
    static willTransition(transition) {
      if (!SessionStore.isLoggedIn()) {
        let transitionPath = transition.path;

        RouteActions.storeTransitionPath(transitionPath);

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
    }

    _onChange() {
      this.setState(this._getSessionState());
    }

    componentWillUnmount() {
      SessionStore.removeChangeListener(this.changeListener);
      UserStore.addChangeListener(this.changeListener);
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

