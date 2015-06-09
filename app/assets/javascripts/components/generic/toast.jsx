var Toast = React.createClass({
  render: function() {
    return (
      <div className="Toast">
        {this.props.message}
      </div>
    );
  }
});
