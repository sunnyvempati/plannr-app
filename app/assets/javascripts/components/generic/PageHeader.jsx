import skrollr from 'skrollr';
import ProfileDropdownMenu from './ProfileDropdownMenu';

var PageHeader = React.createClass({
  // getDefaultProps: function() {
  //   return {
  //     skrollable: true
  //   };
  // },

  render: function() {
    // if (this.props.skrollable) this.enableSkrollrHeader();
    // to do disable else
    let className = "PageHeader " + this.props.pageClass;
    return (
      <div id="mainHeader"
           className={className}>
        <div id="mainTitle"
             className="PageHeader-title u-wrapWithEllipsis">
          {this.props.header}
        </div>
        <div className="PageHeader-profile">
          <ProfileDropdownMenu profile={this.props.profile}
                               email={this.props.email} />
        </div>
      </div>
    );
  }
});

export default PageHeader;
