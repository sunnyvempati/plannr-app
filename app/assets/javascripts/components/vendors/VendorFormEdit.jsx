import VendorForm from './VendorForm';
import VendorStore from '../../stores/VendorStore';
import VendorActions from '../../actions/VendorActions';
import PageTitleActions from '../../actions/PageTitleActions';

var VendorFormEdit = React.createClass({
  getVendorState() {
    return {
      vendor: VendorStore.get(this.props.params.id) || null
    }
  },
  getInitialState: function() {
    return this.getVendorState();
  },
  componentDidMount() {
    PageTitleActions.setPageTitle("Edit Vendor", true);
    VendorStore.addChangeListener(this._onChange);
    if (!this.state.vendor) VendorActions.get(this.props.params.id);
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(this.getVendorState());
  },
  render() {
    return (
      <VendorForm model={this.state.vendor} type="OLD" />
    );
  }
});

export default VendorFormEdit;
