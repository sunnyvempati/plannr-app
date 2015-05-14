var EventAppTile = React.createClass({
  render: function() {
    return (
      <div className="EventAppTile">
        <div className="EventAppTitle">
          Contacts
        </div>
        <div className="EventApp-header">
          <div className="EventApp-nav">
            <div className="EventApp-headerIcon">
              <i className="fa fa-th-large"></i>
            </div>
            <div className="EventApp-headerIcon">
              <i className="fa fa-check"></i>
            </div>
            <div className="EventApp-headerIcon">
              <i className="fa fa-book"></i>
            </div>
            <div className="EventApp-headerIcon">
              <i className="fa fa-truck"></i>
            </div>
            <div className="EventApp-headerIcon">
              <i className="fa fa-paperclip"></i>
            </div>
          </div>
        </div>
        <div className="EventApp-content">
          <RouteHandler />
        </div>
      </div>
    );
  }
});