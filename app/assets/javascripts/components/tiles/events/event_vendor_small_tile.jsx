var EventVendorSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("vendors", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.event_vendors.length
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="EventVendorSmallTile">
        <Link to="tileVendorsList">Zoom In - Vendors</Link>
        <ObjectCount count={this.state.count} text='Vendors' />
      </div>
    );
  }
});
