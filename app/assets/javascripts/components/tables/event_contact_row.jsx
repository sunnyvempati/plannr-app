var EventContactRow = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div className="Table-row">
        <div className="Table-rowItem u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkboxChanged} value={data["id"]} checked={this.props.checked} />
        </div>
        <div className="Table-rowItem u-flexGrow-3">{data["name"]}</div>
        <div className="Table-rowItem u-flexGrow-4">{data["email"]}</div>
      </div>
    );
  }
});
