var TableHeader = React.createClass({
  render: function() {
    var data = this.props.data;
    var growClass = "u-flexGrow-" + data.grow;
    var headerClass = "Table-rowItem " + growClass;
    return (
      <div className={headerClass}>{data.name}</div>
    );
  }
});
