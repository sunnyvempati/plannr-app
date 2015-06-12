var AutocompleteDisplaySelectedItem = React.createClass({
  propTypes: {
    textToDisplay: React.PropTypes.string.isRequired,
    onClickCallback: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div className="Autocomplete-picked" onClick={this.props.onClickCallback}>
        <div className="Autocomplete-pickedName">
          {this.props.textToDisplay}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  }
});
