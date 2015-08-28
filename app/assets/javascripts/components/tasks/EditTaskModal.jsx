import ModalMixin from '../mixins/ModalMixin';
import TaskForm from './TaskForm';

const EditTaskModal = React.createClass({
  mixins: [ModalMixin],
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
                onSuccess={this.props.onSuccess}
                type={this.props.type}
                compact={true}
                onSecondaryClick={this.closeModal}
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default EditTaskModal;
