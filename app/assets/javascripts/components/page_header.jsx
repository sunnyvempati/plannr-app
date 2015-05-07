var PageHeader = React.createClass({
  getDefaultProps: function() {
    return {
      disableSkrollableHeader: false
    };
  },
  propTypes: {
    disableSkrollableHeader: React.PropTypes.bool
  },
  componentDidMount: function() {
    if (!this.props.disableSkrollableHeader) {
      this.enableSkrollrHeader();
    }
  },
  enableSkrollrHeader: function () {
    this.setSkrollr($('#mainHeader'), [[0, 'height:168px'], [56, 'height:64px']]);
    this.setSkrollr($('#mainTitle'), [[24, 'padding-top:18px;'], [48, 'padding-top:12px;font-size:34px;'], [56, 'padding-top:6px;'],[57, 'padding-top:0;font-size:20px;margin:auto']]);
    $('.MainContainer-content').css('padding-top', '168px');
    skrollr.init({forceHeight: false});
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
           className="MainContainer-contentHeader">
        <div id="mainTitle"
             className="PageHeader-title">
          {this.props.header}
        </div>
        <div className="PageHeader-appBar">
          <i className="fa fa-search PageHeader-appBarItem"></i>
        </div>
      </div>
    );
  }
});
