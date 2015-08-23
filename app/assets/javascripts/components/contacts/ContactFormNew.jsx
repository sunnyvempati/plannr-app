import ContactForm from './ContactForm';

class ContactFormNew extends React.Component {
  componentDidMount() {
    // this.props.setLayoutParams({header: "Create Event", skrollable: true});
  }

  render() {
    return (
      <ContactForm model={{}} type="NEW" />
    );
  }
}

export default ContactFormNew;
