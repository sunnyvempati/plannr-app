import skrollr from 'skrollr';
import ProfileDropdownMenu from './ProfileDropdownMenu';

var PageHeader = React.createClass({
  propTypes: {
    header: React.PropTypes.string,
    profile: React.PropTypes.object,
    email: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      skrollable: false
    };
  },
  enableSkrollrHeader: function () {
    this.setSkrollr($('#mainHeader'), [[0, 'height:128px'], [56, 'height:64px']]);
    this.setSkrollr($('#mainTitle'), [[56, 'padding-top:6px;font-size:34px'],[57, 'padding-top:0;font-size:20px;margin:auto']]);
    $('.MainContainer-content').css('padding-top', '128px');
    var s = skrollr.init({forceHeight: false});
  },
  setSkrollr: function($element, data) {
    for(var i = 0, l = data.length; i < l; i++) {
      var d = data[i], // the current data entry
          px = d[0], // the scroll position (in pixels)
          css = d[1]; // the css property + value to set
      $element.attr('data-' + px, css);
    }
  },
  render: function() {
    if (this.props.skrollable) this.enableSkrollrHeader();
    // to do disable else
    return (
      <div id="mainHeader"
           className="PageHeader">
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
