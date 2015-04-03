var Notice = React.createClass({
  render: function() {
    return (
      <div className="NoticeContainer">
        {this.props.notice}
      </div>
    );
  }
});