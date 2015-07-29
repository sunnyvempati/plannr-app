var FilterSort = {
  initializeFilterSort: function(defaultParams) {
    this.filterParams = defaultParams.filter;
    this.sortParams = defaultParams.sort;
    this.page = defaultParams.page;
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
  mergeParams: function() {
    var mergedParams = $.extend({}, this.filterParams, this.sortParams, this.searchParams);
    return {filter_sort: mergedParams, page: this.page};
  },
  reloadData: function() {
    this.getTableData(this.mergeParams());
  }
}
