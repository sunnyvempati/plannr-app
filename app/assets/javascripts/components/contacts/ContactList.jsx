import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';

const ContactList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'name_asc'}
    };
  },
  componentDidMount() {
    // this.props.setLayoutParams({header: "Contacts", skrollable: true});
    ContactStore.addChangeListener(this._onViewContactsChange);
  },
  componentDidUpdate: function() {
    if (!ContactStore.contactsLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onViewContactsChange);
  },
  _onViewContactsChange() {
    this.setState({data: ContactStore.viewContacts});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (ContactStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      ContactStore.addCachedContactsToView(params);
      this.setState({data: ContactStore.viewContacts});
    } else ContactActions.getContacts(params);
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "email", grow: 10, header: "Email"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "company", grow: 10, header: "Company"},
      {name: "type", grow: 5, header: "Type"}
    ];
  },
  actionItems: function() {
    return [
      // global means the action is available as a mass action
      {name: "Edit", handler: this.handleEdit, massAction: false},
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  handleActionButtonClick: function() {
    // to do
    // RouteActions.redirect('events_new');
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Add Contact'
                    svgClass='createContact'
                    extraPad={false} />
    );
  },
  goToContact: function(data) {
    // to do
    // this.transitionTo('contact', {id: data.id, currentUser: this.props.currentUser});
  },
  render: function() {
    return (
      <Table
        results={this.state.data}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        extraPadding={true}
        showHeaders={true}
        searchPlaceholder="Search Contacts..."
        onClick={this.goToContact}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});

export default ContactList;
