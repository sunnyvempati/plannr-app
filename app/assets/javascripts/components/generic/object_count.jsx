var ObjectCount = React.createClass({
  propTypes: {
    count: React.PropTypes.string,
    text: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div>
        <span>{this.props.count || "?"}</span> <span>{this.props.text}</span>
      </div>
    );
  }

});
