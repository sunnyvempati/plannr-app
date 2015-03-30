var ContactActionButton = React.createClass({
  handleClick: function(href) {
    location.href = href;
  },
  render: function() {
    return (
      <div className="CreateContactContainer" onClick={this.handleClick.bind(this, this.props.path)}>
        <ActionButton />
      </div>
    );
  }
});