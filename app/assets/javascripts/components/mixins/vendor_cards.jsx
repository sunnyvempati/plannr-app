var VendorCards = {
  getInitialState: function() {
    return {
      vendor: null
    };
  },
  getDetails: function(id) {
    var url = '/vendors/'+id+'.json';
    $.get(url, function(result) {
      if(this.isMounted()) {
        this.setState({vendor: result.vendor});
      }
    }.bind(this))
  },
  // renderVendorInfo: function(contact) {
  //   var emailHref = "mailto:" + contact.email;
  //   var telHref = "tel:+1" + contact.phone;
  //   return (
  //     <div className="Card">
  //       <div className="Card-title">
  //         Contact Info
  //       </div>
  //       <div className="Card-content">
  //         <div className="IconWithText">
  //           <i className="fa fa-envelope CardIcon"></i>
  //           <a href={emailHref}>{contact.email}</a>
  //         </div>
  //         <div className="IconWithText">
  //           <i className="fa fa-phone CardIcon"></i>
  //           <a href={telHref}>{contact.phone}</a>
  //         </div>
  //         <div className="IconWithText">
  //           <i className="fa fa-building CardIcon"></i>
  //           {contact.organization}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // },
}