var Datatable = React.createClass({
    render: function () {
        var thisDataArray = this.props.data;
        var props = this.props;

        var columns = buildColumnList(props.displayFields, props.addCheckboxColumn, props.addActionColumn);

      //convert to a pretty array or arrays [rows[cols]] = [ [col1, col2, etc], [col1, col2, etc], ...]
        var rowDataArray = ConvertDataToRowDataArray(thisDataArray, columns);

        var rows = rowDataArray.map(function (rowData) {
            return <DatatableRow data={rowData}  />
        });

        return (
            <table id={props.id} className='plannr_datatable hover less-compact'>
                <DatatableHeader columns={columns} />
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

function ConvertDataToRowDataArray(data, columns) {
    var retRowData = [];
    $.each(data, function (index, value) {
        var row = [];
        $.each(columns, function (index2, value2) {
            if (value2.name.substring(0,6) === "plannr") {
                if (value2.name === "plannr_checkbox") {
                    row.push(<input type='checkbox' />);
                }
                if (value2.name === "plannr_action") {
                    row.push(<ActionDatatableCellContent hrefRoot={"/tasks"} id={value.id} />);
                }
            } else {
                row.push(value[value2.name]);
            }
        });
        retRowData.push(row);
    });

    return retRowData;
};

function buildColumnList(displayFields, showCheckboxColumn, showActionColumn) {
    var retColumnList = [];

    if (showCheckboxColumn) {
        retColumnList.push({name: "plannr_checkbox", header: ""});
    }

    $.each(displayFields, function (index, value) {
        retColumnList.push({name: value, header: value.replace(/_/g, ' ')})
    })

    if (showActionColumn) {
        retColumnList.push({name: "plannr_action", header: "Action"});
    }

    return retColumnList;
};

var DatatableRow = React.createClass({
    render: function () {
        var thisData = this.props.data;

        var retColumns = [];
        $.each(thisData, function (index, value) {
          retColumns.push(<td>{value}</td>);
        });

        return (
            <tr>{retColumns}</tr>
        );
    }
});

var ActionDatatableCellContent = React.createClass({
  render: function () {
    var thisHrefRoot = this.props.hrefRoot;
    var thisId = this.props.id;
    var showHref = thisHrefRoot + "/" + thisId;
    var editHref = thisHrefRoot + "/" + thisId + "/edit";

    return (<span>
      <a href={showHref}>Show</a> <br />
      <a href={editHref}>Edit</a> <br />
      <a data-confirm='Are you sure?' rel='nofollow' data-method='delete' href={showHref}>Destroy</a>
    </span>);
  }
});

var DatatableHeader = React.createClass({
  render: function () {
    var thisColumns = this.props.columns;

    var headerCells = [];
    $.each(thisColumns, function (index, value) {
      headerCells.push(<DatatableHeaderCell data={value.header} />);
    });

    return (<thead>
      <tr>{headerCells}</tr>
    </thead>);
  }
});

var DatatableHeaderCell = React.createClass({
    render: function () {
        return (<th>{this.props.data}</th>);
    }
});



