var Vendor = React.createClass({
  mixins: [Router.State, Router.Navigation, VendorCards, AssociatedEvents],
  componentDidMount: function() {
    this.getDetails(this.props.params.id);
    this.getEvents();
  },
  getEvents: function() {
    $.get("/vendors/events", {vendor_id: this.props.params.id},  function(result) {
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
                    entity_id={this.props.params.id} />
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
                <i className="fa fa-arrow-left ShowHeaderIcon"></i>
              </div>
              <div className="Show-name">
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
