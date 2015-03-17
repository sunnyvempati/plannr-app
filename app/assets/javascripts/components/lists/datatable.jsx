var Datatable = React.createClass({
  render: function () {
    var thisTasks = this.props.data;
    var props = this.props;

    var rows = thisTasks.map(function (task) {
      return <DatatableRow task={task} displayFields={props.displayFields} addCheckboxColumn={props.addCheckboxColumn} addActionColumn={props.addActionColumn} />
    });

    return (
      <table className='plannr_datatable hover less-compact'>
        <DatatableHeader displayFields={props.displayFields} addCheckboxColumn={props.addCheckboxColumn} addActionColumn={props.addActionColumn}/>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var DatatableHeader = React.createClass({

  render: function () {

    var thisDisplayFields = this.props.displayFields;
    var extraPreColumns = null;
    var extraPostColumns = null;
    if (this.props.addCheckboxColumn) {
      extraPreColumns = (<th></th>);
    }

    if (this.props.addActionColumn) {
      extraPostColumns = (<th>Actions</th>);
    }

    var headerCells = thisDisplayFields.map(function (field) {
      return (
        <DatatableHeaderCell data={field} />
      );
    })

    return (<thead>
      <tr>{extraPreColumns} {headerCells} {extraPostColumns}</tr>
    </thead>);
  }

});


var DatatableRow = React.createClass({
  render: function () {

    var thisTask = this.props.task;
    var thisDisplayFields = this.props.displayFields;

    var keysToDisplay = [];
    if (this.props.addCheckboxColumn) {
      keysToDisplay.push('plannr_checkbox');
    }
    for (var key in thisTask) {
      if (thisTask.hasOwnProperty(key)) {
        if ($.inArray(key, thisDisplayFields) >= 0) {
          keysToDisplay.push(key);
        }
      }
    }
    if (this.props.addActionColumn) {
      keysToDisplay.push('plannr_actions');
    }

    var retCells = keysToDisplay.map(function (key) {
      var retData;
      var checkboxHtml = (<input type='checkbox' />);
      if (key === 'plannr_checkbox') {
        retData = (<DatatableCell data={checkboxHtml} />);
      }
      else if (key === 'plannr_actions') {
        retData = (<ActionDatatableCell id={thisTask.id} />);
      }
      else {
        retData = (<DatatableCell data={thisTask[key]} />);
      }

      return (
        retData
      );
    });

    return (
      <tr>{retCells}</tr>
    );
  }
});

var DatatableCell = React.createClass({
  render: function () {
    return (<td>{this.props.data}</td>);
  }
});

var DatatableHeaderCell = React.createClass({
  render: function () {
    return (<th>{this.props.data}</th>);
  }
});

var ActionDatatableCell = React.createClass({
  render: function () {
    var showHref = "/tasks/" + this.props.id;
    var editHref = "/tasks/" + this.props.id + "/edit";

    return(<td>
      <a href={showHref}>Show</a> <a href={editHref}>Edit</a> <a data-confirm='Are you sure?' rel='nofollow' data-method='delete' href={showHref}>Destroy</a>
    </td>);
  }
});


