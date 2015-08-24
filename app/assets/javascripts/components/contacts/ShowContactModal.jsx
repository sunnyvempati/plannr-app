import ModalMixin from '../mixins/ModalMixin';
import ContactCards from './ContactCards';
import EventContactStore from '../../stores/EventContactStore';

var ShowContactModal = React.createClass({
  mixins: [ModalMixin, ContactCards],
  renderModalContent: function() {
    console.log(this.props);
    var contact = EventContactStore.getContact(this.props.id);
    if (contact) {
      var contactHref = "/#/contacts/"+contact.id;
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="EntityModal-title u-wrapWithEllipsis">
              <a href={contactHref} target="_blank">
                {contact.name}
              </a>
            </div>
          </div>
          <div className="EntityModal-content">
            <div className="EntityModal-card">
              {this.renderContactInfo(contact)}
            </div>
            <div className="EntityModal-card">
              {this.renderDescription(contact.description)}
            </div>
          </div>
        </div>
      )
    }
  }
});

export default ShowContactModal;
