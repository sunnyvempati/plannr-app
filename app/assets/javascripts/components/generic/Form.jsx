import Formsy from 'formsy-react';
import FormInput from './FormInput.jsx';

var Form = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    mapping: React.PropTypes.any,
    authToken: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      mapping: {}
    };
  },
  render: function() {
    var form_props = this.props;
    return (
      <Formsy.Form url={form_props.url}
                   onSubmit={this.props.onSubmit}
                   onValid={this.props.onValid}
                   onInvalid={this.props.onInvalid}
                   mapping={form_props.mapping}
                   id={form_props.id}>
        {form_props.children}
      </Formsy.Form>
    );
  }
});

export default Form;
