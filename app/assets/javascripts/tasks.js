// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function () {
    $("#task_datatable").dataTable({
      paging:false,
      columnDefs: [{
        targets: "datatable-nosort",
        orderable: false
      }]
    });
  }
)
