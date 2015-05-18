var ShowContactModal = React.createClass({
  mixins: [Modal],
  renderModalContent: function() {
    return (
      <div className="ContactModal">
        <div className="ContactModal-close">
          <div className="CloseContent u-clickable" onClick={this.closeModal}>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <h1>{this.props.data.name}</h1>
      </div>

    )
  }
});
