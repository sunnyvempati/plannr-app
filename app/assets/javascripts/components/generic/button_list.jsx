//contains two buttons which may be toggled on or off
//    primary_button_text: "Submit"
//    secondary_button_text: "Cancel"
//    hide_primary_button: "true"
//    hide_secondary_button: "true"

var ButtonList = React.createClass({
  render: function() {
    return (
      <div className="ButtonListContainer">
        <ButtonSecondary isVisible={this.props.secondaryVisible} className="FormCancelButton" action={this.props.action}>
            {this.props.secondaryBtnText}
        </ButtonSecondary>
        <Button type="submit" className="FormSubmitButton">
          {this.props.primaryBtnText}
        </Button>
      </div>
    );
  }
});

// var ButtonList = React.createClass({
//     render: function() {
//         var all_props = this.props;
//         return (
//             <div className="Button-overlay">
//                 { this.props.hide_primary_button === true ?  null : <SubmitButton {...all_props} /> }
//                  { this.props.hide_secondary_button === true ?  null : <CancelButton {...all_props} /> }
//             </div>
//         );
//     }
// });


// var SubmitButton = React.createClass({
//     render: function() {
//         var all_props = this.props;
//         return (
//             <Button type="submit" className="FormSubmitButton" {...all_props} >
//             {this.props.primary_button_text}
//             </Button>
//         );
//     }
// });

// var CancelButton = React.createClass({
//     render: function() {
//         var all_props = this.props;
//         return (
//             <ButtonSecondary type="" className="FormCancelButton=" {...all_props} >
//                 {this.props.secondary_button_text}
//             </ButtonSecondary>
//         );
//     }
// });