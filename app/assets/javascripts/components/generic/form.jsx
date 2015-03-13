var Form = React.createClass({
  render: function() {
    var all_props = this.props;
    return (
      <div className="FormContainer">
        <form acceptCharset="UTF-8" {...all_props}>
            {this.props.children}
            <input name="_method" type="hidden" value={this.props.route_verb} />
                <ButtonList {...all_props} />



        </form>
      </div>
    );
  }
});


