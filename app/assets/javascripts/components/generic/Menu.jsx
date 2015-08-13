import MenuHeader from './MenuHeader';
import MenuContent from './MenuContent';
import MenuFooter from './MenuFooter';

var Menu = React.createClass({
  render: function() {
    return (
      <div className="MenuContainer">
        <MenuHeader />
        <MenuContent activePath={this.props.path}
                     company={this.props.company}
                     admin={this.props.admin} />
        <MenuFooter />
      </div>
    );
  }
});

export default Menu;
