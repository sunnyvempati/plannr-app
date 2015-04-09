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
    this.refreshData();
  },
  refreshData: function () {
    this.getAssociatedData();
    this.getUnassociatedData();
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
      <ContactAutoComplete eventId={this.props.associatedObjectId} callback={this.refreshData} /> <br/>
      unassociated_contacts:
      <ContactAssociationList items={this.state.unassociatedItems} associated={false} associatedObjectId={this.props.associatedObjectId} onSuccessCallback={this.refreshData} />
      </div>
      <div>
      associated_contacts:
      <ContactAssociationList  items={this.state.associatedItems} associated={true} associatedObjectId={this.props.associatedObjectId} onSuccessCallback={this.refreshData} />
      </div>
      </div>);
}
});


