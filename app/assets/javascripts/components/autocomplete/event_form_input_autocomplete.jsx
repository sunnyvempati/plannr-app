var EventFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string //eventId
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
  onAutocompleteItemSelected: function (e, item, term) {
    if (id === -1) {
      this.quickCreateItem(term);
    }else {
      this.setItem(item.id, item.name);
    }
  },

  /* unique for event - START */
  searchByTermAsync: function (term) {
    $.get("/search_events", {search: {text: term || ""}}, function (result) {
      var itemDataArray = result.events || [];
      if (itemDataArray.length == 0) {
        itemDataArray.push(this.getNewItem("event"));
      }
      if (this.isMounted()) {
        this.setState({itemDataArray: itemDataArray});
      }
    }.bind(this));
  },
  retrieveItemAndSetItem: function (id) {
    $.get("/events/" + id + ".json", function (result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this));
  },
  quickCreateItem: function (term) {
    var payload = {event: {name: term}};
    $.post("/events.json", payload, function (result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this))
  },


  /* unique for event - END */

  render: function () {
    return (
      <FormInputAutocomplete id={this.props.id}
                             name={this.props.name}
                             label={this.props.label}
                             onSearchTermChangeCallback={this.searchByTermAsync}
                             retrieveItemAsyncAndSetItem={this.retrieveItemAndSetItem}
                             itemId={this.state.itemId}
                             itemName={this.state.itemName}
                             isItemSelected={this.state.isItemSelected}
                             autocompleteDataArray={this.state.itemDataArray}
                             itemSelectedCallback={this.onAutocompleteItemSelected}
                             clearItemCallback={this.clearItem}
        />
    );
  }
});
