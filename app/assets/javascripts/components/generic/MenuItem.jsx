import ClassNames from 'classnames';
import {Link} from 'react-router';

var MenuItem = React.createClass({
  _closeMenu() {
    document.getElementById('menu-trigger').checked = false;
  },
  render: function() {
    var item = this.props.item;
    var itemClasses = ClassNames({
      'MenuList-item': true,
      'u-clickable': true
    });
    var iconClasses = {
      'MenuList-icon': true,
      'u-dim': this.props.active
    };
    iconClasses[this.props.item.icon_class] = true;
    return (
      <Link to={this.props.item.path} onClick={this._closeMenu} className={itemClasses}>
        <i className={ClassNames(iconClasses)} />
        <div className="MenuList-text">
          {item.name}
        </div>
      </Link>
    );
  }
});

export default MenuItem;
