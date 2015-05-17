var ContactModal = React.createClass({
  mixins: [Modal],
  renderModalContent: function() {
    return (
      <h1>{this.props.data.name}</h1>
    )
  }
});
