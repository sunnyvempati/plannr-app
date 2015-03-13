//contains two buttons which may be toggled on or off
//    submit_button_text: "Submit"
//    cancel_button_text: "Cancel"
//    hide_submit_button: "true"
//    hide_cancel_button: "true"

var ButtonList = React.createClass({
    render: function() {
        var all_props = this.props;
        return (
            <div className="Button-overlay">
                { this.props.hide_submit_button === true ?  null : <SubmitButton {...all_props} /> }
                 { this.props.hide_cancel_button === true ?  null : <CancelButton {...all_props} /> }
            </div>
        );
    }
});


var SubmitButton = React.createClass({
    render: function() {
        var all_props = this.props;
        return (
            <Button type="submit" className="FormSubmitButton" {...all_props} >
            {this.props.submit_button_text}
            </Button>
        );
    }
});

var CancelButton = React.createClass({
    render: function() {
        var all_props = this.props;
        return (
            <ButtonSecondary type="" className="FormCancelButton" {...all_props} >
                {this.props.cancel_button_text}
            </ButtonSecondary>
        );
    }
});