import Modal from '../mixins/Modal';

const EditTaskModal = React.createClass({
  mixins: [Modal],
  getInitialState: function() {
    return {
      task: this.props.model
    };
  },
  componentDidMount: function() {
    // to do
    // if (!!this.state.task.id) {
    //   var url = '/tasks/' + this.state.task.id + '.json';
    //   Utils.get(url, {}, function(result) {
    //     this.setState({task: result.task, taskLoaded: true});
    //   }.bind(this));
    // }
  },
  renderModalContent: function() {
    var verb = this.props.routeVerb;
    if (verb == 'POST' || (verb == 'PUT' && this.state.taskLoaded)) {
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="EntityModal-title">
              <h1>Edit Task</h1>
            </div>
          </div>
          <div className="EntityModal-content">
            <div className="Card">
              <div className="Card-content">
                Form
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

export default EditTaskModal;
