var Footer = React.createClass({
  render: function() {
    var termsOfServiceUrl = this.props.webPath + "terms_of_service";
    return (
      <div className="Footer">
        <div className="Footer-content">
          <div className="Footer-socialMedia">
            <a href="https://twitter.com/yourplannr" target="_blank"><div className="Twitter"></div></a>
            <a href="https://www.linkedin.com/company/plannr" target="_blank"><div className="Linkedin"></div></a>
            <a href="https://www.facebook.com/yourplannr" target="_blank"><div className="Facebook"></div></a>
          </div>
          <div className="Footer-links">
            <a href="mailto:support@yourplannr.com">Support</a> | <a href={termsOfServiceUrl}>Terms of Service</a>
          </div>
        </div>
        <div className="Footer-footnote">
          © {this.props.year}&nbsp;| Built with&nbsp;<div className="Heart"></div>&nbsp;in Chicago / Denver
        </div>
      </div>
    );
  }
});

export default Footer;
