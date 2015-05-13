var AutocompleteRenderNew = {
  getNewItem: function(entityName) {
    return {
      name: "Create new " + entityName,
      id: -1
    }
  },
  renderItem: function(item, term) {
    var itemName = item.name;
    if (item.id != -1) {
      itemName = this.formatMatchedCharacters(itemName, term);
    }
    var cx = React.addons.classSet;
    var itemClasses = cx({
      'Autocomplete-resultsItem': true,
      'u-italics': item.id == -1
    });
    return (
      <div className={itemClasses}
           dangerouslySetInnerHTML={{__html: itemName}}>
      </div>
    );
  }
}
