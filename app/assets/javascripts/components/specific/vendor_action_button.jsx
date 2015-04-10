var VendorActionButton = React.createClass({
  handleClick: function(href) {
    location.href = href;
  },
  render: function() {
    return (
      <div className="CreateVendorContainer" onClick={this.handleClick.bind(this, this.props.path)}>
        <ActionButton />
      </div>
    );
  }
});