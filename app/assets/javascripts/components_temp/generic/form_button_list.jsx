var FormButtonList = React.createClass({
  render: function() {
    var buttonChild = this.props.primaryLoading ? this.loadingIcon() : this.props.primaryButtonText;
    return (
      <div className="ButtonListContainer">
        {this.props.children}
      </div>
    );
  }
});
