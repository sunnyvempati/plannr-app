import TaskStore from '../../stores/TaskStore';

export default {
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.initializeFilterSort(this.defaultFilterSortParams());
    this.fetchNextPage(1);
  },
  initializeFilterSort: function(defaultParams) {
    this.filterParams = defaultParams.filter;
    this.sortParams = defaultParams.sort;
  },
  sort: function(entity, order) {
    this.sortParams = {sorted_by: entity + "_" + order};
    this.resetPageAndFetch();
  },
  search: function(e) {
    var term = e.target.value;
    this.searchParams = {search_query: term};
    this.resetPageAndFetch();
  },
  filter: function(params) {
    this.filterParams = params;
    this.resetPageAndFetch();
  },
  resetPageAndFetch: function() {
    this.resetPage();
    this.fetchNextPage(this.nextPage);
  },
  resetPage: function() {
    this.nextPage = 1;
  },
  mergeParams: function() {
    var mergedParams = $.extend({}, this.filterParams, this.sortParams, this.searchParams, {page: this.page});
    return mergedParams;
  }
}
