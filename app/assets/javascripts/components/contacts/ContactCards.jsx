export default {
  renderContactInfo: function(contact) {
    var emailHref = "mailto:" + contact.email;
    var telHref = "tel:+1" + contact.phone;
    return (
      <div className="Card">
        <div className="Card-title">
          Contact Info
        </div>
        <div className="Card-content">
          <div className="IconWithText">
            <i className="fa fa-envelope CardIcon"></i>
            <a href={emailHref}>{contact.email}</a>
          </div>
          <div className="IconWithText">
            <i className="fa fa-phone CardIcon"></i>
            <a href={telHref}>{contact.phone}</a>
          </div>
          <div className="IconWithText">
            <i className="fa fa-building CardIcon"></i>
            {contact.company}
          </div>
        </div>
      </div>
    )
  },
  renderDescription: function(description) {
    return (
      <div className="Card">
        <div className="Card-title">Description</div>
        <div className="Card-content">
          {description}
        </div>
      </div>
    )
  }
}
