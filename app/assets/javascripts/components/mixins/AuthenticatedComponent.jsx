import RouteActions from '../../actions/RouteActions';
import SessionStore from '../../stores/SessionStore';

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
        user: SessionStore.user
      }
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      SessionStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getSessionState());
    }

    componentWillUnmount() {
      SessionStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <PrivateComponent
        {...this.props}
        user={this.state.user}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
}

