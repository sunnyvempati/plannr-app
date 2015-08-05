import $ from 'jquery';
import React from 'react';
import TopMenu from './session/TopMenu';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      React.render(
        <TopMenu />,
        document.getElementById('content')
      );
    }
  }

  render();

  // Next part is to make this work with turbo-links
  $(document).on('page:change', () => {
    render();
  });
});
