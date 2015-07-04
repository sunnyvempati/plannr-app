var ContactFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function() {
    var action = "/contacts";

    return (
      <ContactForm
        action={action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}/>
    );
  }
});

