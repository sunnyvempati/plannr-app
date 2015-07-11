var FilterSort = {
  initializeFilterSort: function(defaultParams) {
    this.filterParams = defaultParams.filter;
    this.sortParams = defaultParams.sort;
    this.reloadData();
  },
  sort: function(entity, order) {
    this.sortParams = {sorted_by: entity + "_" + order};
    this.reloadData();
  },
  search: function(e) {
    var term = e.target.value;
    this.searchParams = {search_query: term};
    this.reloadData();
  },
  filter: function(params) {
    this.filterParams = params;
    this.reloadData();
  },
  reloadData: function() {
    var mergedParams = $.extend({}, this.filterParams, this.sortParams, this.searchParams);
    var params = {filter_sort: mergedParams};
    this.getTableData(params);
  }
}
