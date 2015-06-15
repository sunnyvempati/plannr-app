var EventFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      isItemSelected: false,
      itemName: null,
      itemDataArray: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var itemId = this.props.value || null;
    if (itemId) {
      this.retrieveItemAndSetItem(itemId);
    }
  },
  onItemSelected: function(item, term) {
    if (item.id == -1) {
      this.quickCreateItemAndSetItem(term);
    }
    else {
      this.setItem(item.id, item.name);
    }
  },
  setItem: function(id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name});
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null});
      }
    }
  },
  onAutocompleteEditButtonClick: function() {
    var newState = this.getInitialState();
    newState.focus = true;
    if (this.isMounted()) {
      this.setState(newState);
    }
  },

  /* unique for event START */
  retrieveItemAndSetItem: function(itemId) {
    this.retrieveEventAsyncAndSetItem(itemId);
  },
  searchForAutocompleteData: function(term) {
    this.searchEventsAsync(term);
  },

  searchEventsAsync: function(term) {
    $.get("/search_events", {search: {text: term || ""}}, function(result) {
      var itemDataArray = result.events || [];
      if (itemDataArray.length == 0) {
        itemDataArray.push(this.getNewItem("event"));
      }
      if (this.isMounted()) {
        this.setState({itemDataArray: itemDataArray});
      }
    }.bind(this));
  },
  retrieveEventAsyncAndSetItem: function(id) {
    $.get("/events/" + id + ".json", function(result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this));
  },
  quickCreateItemAndSetItem: function(term) {
    var payload = {event: {name: term}};
    $.post("/events.json", payload, function(result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this))
  },
  /* unique for event END */

  renderAutocomplete: function() {
    return (
      <Autocomplete id={this.props.id}
                    name={this.props.name}
                    retrieveData={this.searchForAutocompleteData}
                    itemSelected={this.onItemSelected}
                    data={this.state.itemDataArray}
                    focus={this.state.focus}
                    renderItem={this.renderItem}/>
    );
  },
  renderSelectedItem: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
        <div className="Autocomplete-pickedName">
          {this.state.itemName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },

  render: function() {
    var inputRender = this.state.isItemSelected ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});
