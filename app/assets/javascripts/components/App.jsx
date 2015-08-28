import {RouteHandler} from 'react-router';
import RouteStore from '../stores/RouteStore';
import ToastStore from '../stores/ToastStore';


class App extends React.Component {
  render() {
    return (
      <RouteHandler />
    );
  }
}

export default App;
