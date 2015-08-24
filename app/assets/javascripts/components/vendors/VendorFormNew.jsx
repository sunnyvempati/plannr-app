import VendorForm from './VendorForm';
import PageTitleActions from '../../actions/PageTitleActions';

class VendorFormNew extends React.Component {
  componentDidMount() {
    PageTitleActions.setPageTitle("Vendors", true);
  }

  render() {
    return (
      <VendorForm model={{}} type="NEW" />
    );
  }
}

export default VendorFormNew;
