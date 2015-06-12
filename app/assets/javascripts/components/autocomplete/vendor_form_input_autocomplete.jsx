var VendorFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string //vendorId
  },
  getInitialState: function () {
    return {
      isItemSelected: false,
      itemName: null,
      itemId: null,
      itemDataArray: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function () {
    var itemId = this.props.value || null;
    if (itemId) {
      this.retrieveItemAndSetItem(itemId);
    }
  },
  setItem: function (id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name, itemId: id});
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null, itemId: null});
      }
    }
  },
  clearItem: function () {
    this.setItem(null, null);
  },

  /* specific to vendors - START */
  searchByTermAsync: function (term) {
    $.post("/vendors/search", {search: {text: term || ""}}, function (result) {
      var itemDataArray = result.vendors || [];
      if (itemDataArray.length == 0) {
        itemDataArray.push(this.getNewItem("vendor"));
      }
      if (this.isMounted()) {
        this.setState({itemDataArray: itemDataArray});
      }
    }.bind(this));
  },
  retrieveItemAndSetItem: function (id) {
    $.get("/vendors/" + id + ".json", function (result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
    }.bind(this));
  },

  quickCreateItemAndSetItem: function (term) {
    var payload = {vendor: {name: term}};
    $.post("/vendors.json", payload, function (result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
    }.bind(this))
  },
  /* specific to vendors - END */

  render: function () {
    return (
      <FormInputAutocomplete id={this.props.id}
                             name={this.props.name}
                             label={this.props.label}
                             onSearchTermChangeCallback={this.searchByTermAsync}
                             retrieveItemAsyncAndSetItem={this.retrieveItemAndSetItem}
                             quickCreateItemAndSetItem={this.quickCreateItemAndSetItem}
                             itemId={this.state.itemId}
                             itemName={this.state.itemName}
                             isItemSelected={this.state.isItemSelected}
                             autocompleteDataArray={this.state.itemDataArray}
                             quickCreateItemCallback={this.quickCreateItemAndSetItem}
                             setItemCallback={this.setItem}
                             clearItemCallback={this.clearItem}
        />
    );
  }
});
