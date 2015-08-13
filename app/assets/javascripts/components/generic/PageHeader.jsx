import skrollr from 'skrollr';

var PageHeader = React.createClass({
  propTypes: {
    disableSkrollableHeader: React.PropTypes.bool,
    header: React.PropTypes.string,
    profile: React.PropTypes.object,
    email: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      disableSkrollableHeader: false
    };
  },
  componentDidMount: function() {
    if (!this.props.disableSkrollableHeader) {
      this.enableSkrollrHeader();
    }
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
    return (
      <div id="mainHeader"
           className="PageHeader">
        <div id="mainTitle"
             className="PageHeader-title u-wrapWithEllipsis">
          {this.props.header}
        </div>
        <div className="PageHeader-profile">
          Add Profile
        </div>
      </div>
    );
  }
});

export default PageHeader;
