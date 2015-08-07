var Vendor = React.createClass({
  mixins: [Router.State, Router.Navigation, VendorCards, AssociatedEvents],
  componentDidMount: function() {
    this.getDetails(this.props.params.id);
    this.getEvents();
  },
  getEvents: function() {
    var params = {
      filter_sort: {
        with_vendor_id: this.props.params.id
      }
    };
    $.get("/vendor_events.json", params,  function(result) {
      this.setState({events: result.event_vendors});
    }.bind(this));
  },
  backToList: function() {
    this.transitionTo('vendors');
  },
  renderComments: function() {
    return (
      <div className="Card">
        <div className="Card-title">Comments</div>
        <div className="Card-content">
          <Comments entity="Vendor"
                    entity_id={this.props.params.id}
                    currentUser={this.props.currentUser} />
        </div>
      </div>
    )
  },
  renderVendor: function() {
    var vendor = this.state.vendor;
    if (vendor) {
      var editHref = "/vendors/"+vendor.id+"/edit";
      return (
        <div>
          <div className="Show-header">
            <div className="Show-nav">
              <div onClick={this.backToList} className="u-clickable">
                <div className="BackIcon"></div>
              </div>
              <div className="Show-name u-wrapWithEllipsis">
                {vendor.name}
              </div>
            </div>
            <div className="Show-actions">
              <a href={editHref}>
                <i className="fa fa-pencil ShowHeaderIcon"></i>
              </a>
            </div>
          </div>
          <div className="Show-content">
            <div className="u-flex">
              <div>
                {this.renderVendorInfo(vendor)}
                {this.renderDescription(vendor.description)}
                {this.renderEvents()}
              </div>
              {this.renderComments()}
            </div>
          </div>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="Show">
        {this.renderVendor()}
      </div>
    );
  }
});
