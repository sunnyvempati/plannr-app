var ContactAssociationEditor = React.createClass({
  propTypes: {
    associatedObjectId: React.PropTypes.number.isRequired
  },
  getInitialState: function () {
    return {
      associatedItems: [],
      unassociatedItems: []
    };
  },
  componentDidMount: function () {
    this.getAssociatedData();
    this.getUnassociatedData();
  },
  callback: function () {
    this.getUnassociatedData();
    this.getAssociatedData();
  },
  onSuccessAdd: function () {
    this.props.callback();
  },
  onSuccessRemove: function () {
    this.props.callback();
  },
  getAssociatedData: function () {
    var _this = this;
    var url = "/events/" + this.props.associatedObjectId + "/associated_contacts";
    var stateDataKey = "associatedItems";

    this.getData(this, url)
    .done(function(result){
      var tempState = {};
      tempState[stateDataKey] = result.data;   
      _this.setState(tempState);
    } )
    .fail(function (jqXHR, textStatus, errorThrown) {
        //TODO: better error handling
        throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
      });
  },
  getUnassociatedData: function () {
    var _this = this;
    var url = "/events/" + this.props.associatedObjectId + "/unassociated_contacts";
    var stateDataKey = "unassociatedItems";

    this.getData(this, url)
    .done(function(result){
      var tempState = {};
      tempState[stateDataKey] = result.data;   
      _this.setState(tempState);
    } )
    .fail(function (jqXHR, textStatus, errorThrown) {
        //TODO: better error handling
        throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
      });;
  },
  getData: function (context, url) {
    return $.ajax({
      context: context,
      url: url,
      dataType: "json",
      type: "get"
    });
  },

  render: function () {

    return (<div>
      <div>
      <ContactAutoComplete eventId={this.props.associatedObjectId} callback={this.callback} /> <br/>
      unassociated_contacts:
      <ContactAssociationList ref='unass' items={this.state.unassociatedItems} associated={false} associatedObjectId={this.props.associatedObjectId} onSuccessCallback={this.callback} />
      </div>
      <div>
      associated_contacts:
      <ContactAssociationList ref='ass' items={this.state.associatedItems} associated={true} associatedObjectId={this.props.associatedObjectId} onSuccessCallback={this.callback} />
      </div>
      </div>);
}
});


