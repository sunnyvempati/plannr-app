import React from 'react';

const TopMenu = React.createClass({
  goToMain() {
    location.href = "www.google.com";
  },
  render() {
    return (
      <div className="TopMenu">
        <div className="TopMenu-logo" onClick={this.goToMain}>
        </div>
        <div className="TopMenu-itemContainer">
          <div className="TopMenu-item">
            <a href="http://plannr.wordpress.com">Blog</a>
          </div>
          <div className="TopMenu-item">
            <a href='/sign_up'>Free Trial</a>
          </div>
          <div className="TopMenu-item">
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    );
  }
});

export default TopMenu;
