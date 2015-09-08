import Formsy from 'formsy-react';
import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import classNames from 'classnames';

var DropdownInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin,
    FormInputClassesMixin
  ],
  getDefaultProps: function() {
    return {
      dropdownOptionsClass: 'DropdownMenu-options',
      dropdownItemClass: 'DropdownMenu-item'
    };
  },
  getInitialState: function() {
    return {
      open: false
    };
  },
  openDropdown: function() {
    this.setState({open: true});
  },
  changeValue: function(o) {
    this.setState({open: false});
    this.props.handleChange(o.value);
  },
  renderInput: function(className) {
    var activeItem = this.getActiveItem();
    return (
      <div className={classNames(className)}>
        <div className="Autocomplete-picked" onClick={this.openDropdown}>
          <div className="Autocomplete-pickedName">
            {activeItem.display}
          </div>
          <div className="Autocomplete-edit">
            <i className="fa fa-caret-down"></i>
          </div>
        </div>
      </div>
    );
  },
  renderDropdown: function() {
    var options = this.props.options.map(function(o) {
      var itemClasses = {};
      itemClasses[this.props.dropdownItemClass] = true;
      return (
        <div className={classNames(itemClasses)} onClick={this.changeValue.bind(this, o)} key={o.value}>
          {o.display}
        </div>
      )
    }.bind(this));
    var ddContainerClasses = {
      'is-fullWidth': true,
    };
    ddContainerClasses[this.props.dropdownOptionsClass] = true;
    return (
      <div className={classNames(ddContainerClasses)}>
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
    var classes = this.getClassNames();
    var inputRender = this.state.open ? this.renderDropdown() : this.renderInput(classes.inputField);
    return (
      <div className={classNames(classes.inputContainer)}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

export default DropdownInput;
