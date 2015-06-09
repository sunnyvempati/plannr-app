var EventFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      isSelected: false,
      eventName: null,
      events: [],
      focus: false, // this is used when you click editAssignedTo
      value: null
    };
  },
  componentDidMount: function() {
    var propsValue = this.props.value || null;
    if (propsValue) {
      $.get("/events/" + propsValue + ".json", function(result) {
        this.setEvent(result.event.id, result.event.name);
      }.bind(this));
    }
  },
  searchEventAsync: function(term) {
    $.get("/search_events", {search: {text: term || ""}}, function(result) {
      var events = result.events;
      if(events.length == 0) {
        events.push(this.getNewItem("event"));
      }
      if (this.isMounted()) {
        this.setState({events: events});
      }
    }.bind(this));
  },
  addToForm: function(event, term) {
    if (event.id == -1) {
      // quick-create event
      var payload = {event: {name: term}};
      $.post("/events.json", payload, function(result) {
        this.setEvent(result.event.id, result.event.name);
      }.bind(this))
    }
    else {
      //this.setValue(event.id);
      this.setEvent(event.id, event.name);
    }
  },
  setEvent: function (id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isSelected: true, eventName: name, value: id});
      } else {
        this.setValue(null);
        this.setState({isSelected: false, eventName: null, value: null});
      }
    }
  },
  editEvent: function() {
    this.setState({isSelected: false, eventName: null, events: [], focus: true, value: null});
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.searchEventAsync}
                    itemSelected={this.addToForm}
                    data={this.state.events}
                    focus={this.state.focus}
                    renderItem={this.renderItem} />
    );
  },
  renderSelectedEvent: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.editEvent}>
        <div className="Autocomplete-pickedName">
          {this.state.eventName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.isItemSelected ? this.renderSelectedEvent() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});
