export default {
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.initializeFilterSort(this.defaultFilterSortParams());
    this.attachScrollListener();
  },
  initializeFilterSort: function(defaultParams) {
    this.filterParams = defaultParams.filter;
    this.sortParams = defaultParams.sort;
  },
  sort: function(entity, order) {
    this.resetPage();
    this.sortParams = {sorted_by: entity + "_" + order};
  },
  search: function(e) {
    this.resetPage();
    var term = e.target.value;
    this.searchParams = {search_query: term};
  },
  filter: function(params) {
    this.resetPage();
    this.filterParams = params;
  },
  resetPage: function() {
    this.nextPage = 1;
    this.setState({data: []});
  },
  mergeParams: function() {
    var mergedParams = $.extend({}, this.filterParams, this.sortParams, this.searchParams, {page: this.page});
    return mergedParams;
  }
}
