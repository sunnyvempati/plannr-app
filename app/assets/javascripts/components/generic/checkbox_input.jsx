var CheckboxInput = React.createClass({
  render: function() {
    var checkboxProps = this.props;
    return (
      <div className="CheckboxContainer">
        <input type="checkbox" onChange={this.props.onChange} value={this.props.value} checked={this.props.checked} className="InputCheckbox" />
      </div>
    );
  }
});