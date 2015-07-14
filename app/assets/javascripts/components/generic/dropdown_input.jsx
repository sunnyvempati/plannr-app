var DropdownInput = React.createClass({
  mixins: [Formsy.Mixin, React.addons.PureRenderMixin],
  getInitialState: function() {
    return {
      open: false
    };
  },
  openDropdown: function() {
    this.setState({open: true});
  },
  changeValue: function(o) {
    this.setValue(o.value);
    this.setState({open: false});
    this.props.handleContactChange(o.value);
  },
  renderInput: function() {
    var activeItem = this.getActiveItem();
    return (
      <div className="Autocomplete-picked" onClick={this.openDropdown}>
        <div className="Autocomplete-pickedName">
          {activeItem.display}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
    );
  },
  renderDropdown: function() {
    var options = this.props.options.map(function(o) {
      var itemClasses = classNames({
        'DropdownMenu-item': true,
        'active': true
      })
      return (
        <div className="DropdownMenu-item" onClick={this.changeValue.bind(this, o)} key={o.value}>
          {o.display}
        </div>
      )
    }.bind(this));
    return (
      <div className="DropdownMenu-options is-fullWidth">
        {options}
      </div>
    );
  },
  getActiveItem: function() {
    var activeValue = this.getValue();
    var activeItem = {};
    this.props.options.forEach(function(o) {
      if (o.value == activeValue) {
        activeItem = o;
      }
    });
    return activeItem;
  },
  render: function() {
    var inputRender = this.state.open ? this.renderDropdown() : this.renderInput()
    return (
      <div className="FormInput">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});
