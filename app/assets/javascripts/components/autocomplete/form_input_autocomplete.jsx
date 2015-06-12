var FormInputAutocomplete = React.createClass({
  mixins: [ AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onSearchTermChangeCallback: React.PropTypes.func.isRequired,
    retrieveItemAsyncAndSetItem: React.PropTypes.func.isRequired,
    quickCreateItemCallback: React.PropTypes.func.isRequired,
    setItemCallback: React.PropTypes.func.isRequired,
    clearItemCallback: React.PropTypes.func.isRequired,

    autocompleteDataArray: React.PropTypes.array,

    isItemSelected: React.PropTypes.bool.isRequired,
    itemName: React.PropTypes.string,
    itemId: React.PropTypes.any
  },
  componentDidMount: function () {
    var itemId = this.props.value || null;
    if (itemId) {
      this.props.retrieveItemAsyncAndSetItem(itemId);
    }
  },

  renderAutocomplete: function () {
    return (
      <Autocomplete id={this.props.id}
                    name={this.props.name}
                    retrieveData={this.props.onSearchTermChangeCallback}
                    data={this.props.autocompleteDataArray}
                    focus={true}
                    renderItem={this.renderItem}
                    itemSelectedCallback={this.props.setItemCallback}
                    quickCreateItemCallback={this.props.quickCreateItemCallback}/>
    );
  },
  renderSelectedItem: function () {
    return (
      <AutocompleteDisplaySelectedItem
        textToDisplay={this.props.itemName || ''}
        onClickCallback={this.props.clearItemCallback}/>
    );
  },
  render: function () {
    var inputRender = this.props.isItemSelected ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});
