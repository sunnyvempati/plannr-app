var ContactModal = React.createClass({
  mixins: [Modal],
  renderModalContent: function() {
    return (
      <div>
        <RouteHandler data={this.props.data} />
      </div>
    );
  }
});