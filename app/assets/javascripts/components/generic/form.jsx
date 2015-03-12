var Form = React.createClass({
  render: function() {
    var all_props = this.props;
    return (
      <div className="FormContainer">
        <form acceptCharset="UTF-8" {...all_props}>
            {this.props.children}
            { this.props.hide_submit_button == 'true' ?  null : <SubmitButton {...all_props} /> }
        </form>
      </div>
    );
  }
});

var SubmitButton = React.createClass({
    render: function() {
        return (
            <Button type="submit" className="FormSubmitButton" >
            {this.props.submit_button_text}
            </Button>
        );
    }
});
