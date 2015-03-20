var Datatable = React.createClass({
    render: function () {
        var thisDataArray = this.props.data;
        var props = this.props;

        var columns = buildColumnList(props.displayFields, props.addCheckboxColumn, props.addActionColumn);

        var rowDataArray = ConvertDataToRowDataArray(thisDataArray, columns);

        var rows = thisDataArray.map(function (rowData) {
            return <DatatableRow data={rowDataArray}  />
        });

        return (
            <table className='plannr_datatable hover less-compact'>
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
            if (value2.left(6) === "plannr") {
                if (value2 === "plannr_checkbox") {
                    row.push("<input type='checkbox' />");
                }

                if (value2 === "plannr_actions") {
                    row.push(<ActionDatatableCell hrefRoot={"/task"} id={value.id} />);
                }
            } else {
                row.push(value[value2]);
            }
        });
        retRowData.push(row);
    });

    return retRowData;
}

function buildColumnList(displayFields, showCheckboxColumn, showActionColumn) {
    var retColumnList = [];

    if (showCheckboxColumn) {
        retColumnList.push({name: "plannr_checkbox", header: ""});
    }

    $.each(displayFields, function (index, value) {
        retColumnList.push({name: value, header: value})
    })

    if (showActionColumn) {
        retColumnList.push({name: "plannr_action", header: "Actions"});
    }

    return retColumnList;
}

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


var DatatableRow = React.createClass({
    render: function () {
        var thisData = this.props.data;

        var retX = [];
        $.each(thisData, function (index, value) {
            retX.push(<td>{value}</td>);
        });


        return (
            <tr>{retX}</tr>
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
        var thisHrefRoot = this.props.hrefRoot;
        var thisId = this.props.id;
        var showHref = thisHrefRoot + "/" + thisId;
        var editHref = thisHrefRoot + "/" + thisId + "/edit";

        return (<span>
            <a href={showHref}>Show</a>
            <a href={editHref}>Edit</a>
            <a data-confirm='Are you sure?' rel='nofollow' data-method='delete' href={showHref}>Destroy</a>
        </span>);
    }
});


