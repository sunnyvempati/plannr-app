'use strict';

export default {
  getDefaultProps: function() {
    return {
      initialPage: 1,
      offset: 250
    };
  },

  componentWillMount: function() {
    this.nextPage = this.props.initialPage;
  },

  componentWillUnmount: function() {
    this.detachScrollListener();
  },

  componentDidUpdate: function() {
    this.attachScrollListener();
  },

  scrollListener: function () {
    var el = document.getElementById('tableData');
    var scrollTop = document.getElementById('tableData').scrollTop;
    if (el.scrollHeight - scrollTop - this.getDOMNode().offsetHeight < this.props.offset) {
      this.detachScrollListener();
      this.fetchNextPage(this.nextPage++);
    }
  },

  attachScrollListener: function () {
    document.getElementById('tableData').addEventListener('scroll', this.scrollListener);
    document.getElementById('tableData').addEventListener('resize', this.scrollListener);
    this.scrollListener();
  },

  detachScrollListener: function () {
    document.getElementById('tableData').removeEventListener('scroll', this.scrollListener);
    document.getElementById('tableData').removeEventListener('resize', this.scrollListener);
  }
};
