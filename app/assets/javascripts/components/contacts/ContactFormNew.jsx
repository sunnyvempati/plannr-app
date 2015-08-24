import ContactForm from './ContactForm';
import PageTitleActions from '../../actions/PageTitleActions';

class ContactFormNew extends React.Component {
  componentDidMount() {
    PageTitleActions.setPageTitle("Create Contact", true);
  }

  render() {
    return (
      <ContactForm model={{}} type="NEW" />
    );
  }
}

export default ContactFormNew;
