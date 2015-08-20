import ModalMixin from '../mixins/ModalMixin';
import TaskForm from './TaskForm';

const EditTaskModal = React.createClass({
  mixins: [ModalMixin],
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
    return (
      <div className="EntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-user"></i>
          </div>
          <div className="EntityModal-title">
            <h1>Task</h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <TaskForm
                onSuccess={this.onSuccess}
                type={this.props.type}
                compact={true}
                onSecondaryClick={this.closeModal}
                model={this.state.task} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default EditTaskModal;
