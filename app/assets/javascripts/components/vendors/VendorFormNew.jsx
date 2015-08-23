import VendorForm from './VendorForm';

class VendorFormNew extends React.Component {
  componentDidMount() {
    // this.props.setLayoutParams({header: "Create Event", skrollable: true});
  }

  render() {
    return (
      <VendorForm model={{}} type="NEW" />
    );
  }
}

export default VendorFormNew;
