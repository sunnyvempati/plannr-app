var Form = React.createClass({
  render: function() {
    var all_props = this.props;
    return (
      <div className="FormContainer">
        <form acceptCharset="UTF-8" {...all_props}>
            {this.props.children}
            { this.props.hideSubmitButton == 'true' ?  null : <SubmitButton {...all_props} /> }
        </form>
      </div>
    );
  }
});

var SubmitButton = React.createClass({
    render: function() {
        return (
            <Button type="submit" className="FormSubmitButton" >
            {this.props.submitBtnText}
            </Button>
        );
    }
});
