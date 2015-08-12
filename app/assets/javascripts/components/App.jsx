import {RouteHandler} from 'react-router';
import TopMenu from './session/TopMenu.jsx';
import Footer from './session/Footer.jsx';
import RouteStore from '../stores/RouteStore';
import ToastStore from '../stores/ToastStore';
import ToastMessage from '../components/generic/ToastMessage';


class App extends React.Component {
  render() {
    return (
      <RouteHandler />
    );
  }
}

export default App;
