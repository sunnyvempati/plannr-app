import {RouteHandler} from 'react-router';
import TopMenu from './session/TopMenu.jsx';
import Footer from './session/Footer.jsx';


class App extends React.Component {
  render() {
    return (
      <div>
        <TopMenu webPath={this.props.webPath} />
        <div className="AppContainer-content">
          <RouteHandler />
        </div>
        <Footer webPath={this.props.webPath} />
      </div>
    );
  }
}

export default App;
