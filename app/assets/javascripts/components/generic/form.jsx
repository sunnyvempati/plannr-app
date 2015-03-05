var Form = React.createClass({
  render: function() {
    var all_props = this.props;
    return (
      <form acceptCharset="UTF-8" {...all_props}>
        {this.props.children}
        <Button type="submit" className={this.props.submitBtnClass}>
          {this.props.submitBtnText}
        </Button>
      </form>
    );
  }
});
