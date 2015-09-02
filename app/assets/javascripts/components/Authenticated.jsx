import {RouteHandler} from 'react-router';
import SessionStore from '../stores/SessionStore';
import PageTitleStore from '../stores/PageTitleStore';
import RouteActions from '../actions/RouteActions';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import PageHeader from './generic/PageHeader';
import Menu from './generic/Menu';
import BaseComponent from './BaseComponent';
import AuthenticatedComponent from './mixins/AuthenticatedComponent';
import skrollr from 'skrollr';

export default AuthenticatedComponent(
  class Authenticated extends BaseComponent {
    constructor() {
      super();
      this.state = {header: null, pageClass: ""};
      this._onPageTitleChange = this._onPageTitleChange.bind(this);
    }

    componentDidMount() {
      PageTitleStore.addChangeListener(this._onPageTitleChange);
      // this.enableSkrollrHeader();
    }
    // enableSkrollrHeader() {
    //   this.setSkrollr($('#mainHeader'), [[0, 'height:128px'], [56, 'height:64px']]);
    //   this.setSkrollr($('#mainTitle'), [[56, 'padding-top:6px;font-size:34px'],[57, 'padding-top:0;font-size:20px;margin:auto']]);
    //   $('.MainContainer-content').css('padding-top', '128px');
    //   var s = skrollr.init({forceHeight: false});
    // }
    // setSkrollr($element, data) {
    //   for(var i = 0, l = data.length; i < l; i++) {
    //     var d = data[i], // the current data entry
    //         px = d[0], // the scroll position (in pixels)
    //         css = d[1]; // the css property + value to set
    //     $element.attr('data-' + px, css);
    //   }
    // }

    componentWillUnmount() {
      PageTitleStore.removeChangeListener(this._onPageTitleChange);
    }

    _onPageTitleChange() {
      let header = PageTitleStore.header;
      let pageClass = PageTitleStore.pageClass;
      this.setState({header: header, pageClass: pageClass});
    }

    _closeMenu() {
      document.getElementById('menu-trigger').checked = false;
    }

    _renderPageDecoration() {
      var currentUser = this.props.currentUser;
      if (currentUser && currentUser.company) {
        return (
          <div>
            <input type="checkbox"
                   id="menu-trigger"
                   className="Hamburger-trigger u-checkboxHidden">
            </input>
            <label htmlFor="menu-trigger">
              <i className="fa fa-bars Hamburger-icon"></i>
            </label>
            <div className="Mask" onClick={this._closeMenu}></div>

            <div className="Menu">
              <Menu company={currentUser.company}
                    admin={currentUser.company_admin} />
            </div>
            <div className="MainContainer">
              <PageHeader header={this.state.header || "Plannr"}
                          profile={currentUser.profile}
                          email={currentUser.email}
                          pageClass={this.state.pageClass} />
              <div className="MainContainer-content">
                <RouteHandler user={currentUser} />
              </div>
            </div>
          </div>
        );
      }
    }

    render() {
      return <div>{this._renderPageDecoration()}</div>
    }

  }
);
