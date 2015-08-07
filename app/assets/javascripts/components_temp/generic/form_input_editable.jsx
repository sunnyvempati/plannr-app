var FormInputEditable = React.createClass({
  getInitialState: function() {
    return {
      pencil: false,
      editMode: false
    };
  },
  showPencil: function() {
    this.setState({pencil: true});
  },
  hidePencil: function() {
    this.setState({pencil: false});
  },
  enableEditMode: function() {
    this.setState({editMode: true});
  },
  renderItem: function() {
    if (this.state.editMode) {
      return (
        <div className="FormInputEditable-input u-noBorder">
          <DatePicker selected={moment(this.props.display)}
                      placeholderText={this.props.placeholder}
                      dateFormat="MM/DD/YYYY"
                      onChange={this.changeValue}
                      minDate={this.props.minDate}
          />
        </div>
      )
    }
    else {
      var iconClasses = classNames({
        'fa fa-pencil': true,
        'FormInputEditableIcon': true,
        'u-hidden': !this.state.pencil
      });
      return (
        <div className="FormInputEditable" onMouseOver={this.showPencil} onMouseOut={this.hidePencil} onClick={this.enableEditMode}>
          <div className="FormInputEditable-display">
            {this.props.display}
          </div>
          <i className={iconClasses}></i>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div>
        {this.renderItem()}
      </div>
    );
  }
});
