var Form = React.createClass({
  render: function() {
    var all_props = this.props;
    return (
      <div className="FormContainer">
        <form acceptCharset="UTF-8" {...all_props}>
          {this.props.children}
          <Button type="submit" className="FormSubmitButton">
            {this.props.submitBtnText}
          </Button>
        </form>
      </div>
    );
  }
});
