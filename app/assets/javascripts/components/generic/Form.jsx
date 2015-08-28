import Formsy from 'formsy-react';
import FormInput from './FormInput.jsx';

var Form = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    mapping: React.PropTypes.any
  },
  getDefaultProps: function() {
    return {
      mapping: {}
    };
  },
  render: function() {
    var form_props = this.props;
    return (
      <Formsy.Form onSubmit={form_props.onSubmit}
                   onValid={form_props.onValid}
                   onInvalid={form_props.onInvalid}
                   mapping={form_props.mapping}
                   validationErrors={form_props.validationErrors}
                   onChange={this.props.resetErrors}
                   id={form_props.id}
                   ref='form'>
        {form_props.children}
      </Formsy.Form>
    );
  }
});

export default Form;
