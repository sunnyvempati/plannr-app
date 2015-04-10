var ContactAssociationEditor = React.createClass({
  refreshData: function () {
    this.refreshAssociatedData();
    this.refreshUnassociatedData();
  },
  refreshAssociatedData: function () {
    //TODO: get rid of this string
    var stateDataKey = "associatedItems";
    this.retrieveDataAsync( this, this.props.retrieveAssociatedDataUrl, stateDataKey);
  },
  refreshUnassociatedData: function () {
    //TODO: get rid of this string
    var stateDataKey = "unassociatedItems";
    this.retrieveDataAsync( this, this.props.retrieveUnassociatedDataUrl, stateDataKey);
  },
  retrieveDataAsync: function (context, url, stateDataKey) {
    $.ajax({
      context: context,
      url: url,
      dataType: "json",
      type: "get"
    }).done(function (result){
      //TODO: don't setState in here, set it via callback?
      var tempState = {};
      tempState[stateDataKey] = result.data;   
      this.setState(tempState);
    } )
    .fail(function (jqXHR, textStatus, errorThrown) {
        //TODO: better error handling
        throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
      });
  },
/* React methods */
  propTypes: {
    associatedObjectId: React.PropTypes.number.isRequired,
    retrieveAssociatedDataUrl: React.PropTypes.string.isRequired,
    retrieveUnassociatedDataUrl: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      associatedItems: [],
      unassociatedItems: [],
      retrieveAssociatedDataUrl: this.props.retrieveAssociatedDataUrl,
      retrieveUnassociatedDataUrl: this.props.retrieveUnassociatedDataUrl
    };
  },
  componentDidMount: function () {
    this.refreshData();
  },
  render: function () {
    return (<div>
      <div>
      <ContactAutoComplete associatedObjectId={this.props.associatedObjectId} callback={this.refreshData} /> <br/>
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


