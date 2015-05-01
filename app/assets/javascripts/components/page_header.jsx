var PageHeader = React.createClass({
  componentDidMount: function() {
    this.setSkrollr($('#mainHeader'), [[0, 'height:168px'], [56, 'height:64px']]);
    this.setSkrollr($('#mainTitle'), [[56, 'padding-top:24px;font-size:34px;'],[57, 'padding-top:0;font-size:20px;margin:auto']]);
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
        <div className="PageHeader-title"
             id="mainTitle">
          {this.props.header}
        </div>
        <div className="PageHeader-appBar">
          <i className="fa fa-search PageHeader-appBarItem"></i>
        </div>
      </div>
    );
  }
});