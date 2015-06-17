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
      itemName = AutocompleteBoldItem.formatMatchedCharacters(itemName, term);
    }
    var itemClasses = classNames({
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
