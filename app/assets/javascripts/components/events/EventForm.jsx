import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import RouteActions from '../../actions/RouteActions';
import FormMixin from '../mixins/FormMixin';
import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import moment from 'moment';
import EventTemplateInput from './EventTemplateInput';
import DatePickerInput from '../generic/DatePickerInput';
import EventClientInput from './EventClientInput';
import TextAreaInput from '../generic/TextAreaInput';
import CurrencyValidator from '../validators/currency';
import extend from 'extend';

var EventForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      model: this.props.model
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({model: nextProps.model});
  },
  mapInputs: function (inputs) {
    return {
      'event': {
        'name': inputs.name,
        'start_date': inputs.start_date,
        'end_date': inputs.end_date,
        'description': inputs.description,
        'location': inputs.location,
        'client_id': inputs.client,
        'budget': inputs.budget
      },
      'template': inputs.template
    };
  },
  setStartDate: function(date) {
    this.setState({model: extend({}, this.state.model, {start_date: date})});
  },
  onSecondaryClick: function() {
    RouteActions.redirect('events');
  },
  onSuccess: function (result) {
    RouteActions.redirect('event', {id: result.id});
  },
  massageDataAndSubmit: function(data, reset, invalidate) {
    data.event.start_date = data.event.start_date && data.event.start_date.format();
    data.event.end_date = data.event.end_date && data.event.end_date.format();
    var budget = data.event.budget;
    budget = !!budget && budget.toString().replace('$','').replace(/,/g,'');
    data.event.budget = budget;
    this.props.type == "NEW" ? EventActions.create(data) : EventActions.update(this.props.model && this.props.model.id, data);
  },
  setEventState: function(item) {
    var eventTemplate = {
      name: "Copy of " + item.name,
      location: item.location,
      client_id: item.client && item.client.id,
      budget: item.budget,
      description: item.description
    };
    this.setState({model: eventTemplate});
  },
  renderTemplateFields: function() {
    if (this.props.type == "NEW") {
      return (
        <EventTemplateInput
          name="template"
          value={{}}
          eventTemplateSelected={this.setEventState} />
      );
    }
  },
  render: function () {
    var id = 'event_form';
    let model = this.state.model, event = {};
    if (model) {
      event = {
        name: model.name,
        start_date: model.start_date ? moment(model.start_date) : null,
        end_date: model.end_date ? moment(model.end_date) : null,
        location: model.location,
        client_id: model.client_id,
        budget: model.budget,
        description: model.description
      };
    }
    var primaryButtonText = this.props.type == "NEW" ? "Create" : "Update";
    return (
      <div className="FormContainer--leftAligned">
        <Form mapping={this.mapInputs}
              onSubmit={this.massageDataAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id={id}>
          {this.renderTemplateFields()}
          <FormInput
            name="name"
            id="event_name"
            autofocus="autofocus"
            placeholder="Give it a unique name"
            type="text"
            label="Name*"
            value={event.name}
            required
          />
          <DatePickerInput
            name="start_date"
            label="Start Date"
            value={event.start_date}
            placeholder="When does it start?"
            onValueSet={this.setStartDate}
            minDate={moment()}
          />
          <DatePickerInput
            name="end_date"
            label="End Date"
            value={event.end_date}
            placeholder="When does it end?"
            minDate={event.start_date}
          />
          <FormInput
            name="location"
            id="event_location"
            type="text"
            label="Location"
            value={event.location}
            placeholder="Where will it be held?"
          />
          <EventClientInput
            name='client'
            value={event.client_id}
            id='event_client'
            label='Client' />
          <FormInput
            name="budget"
            id="event_budget"
            type="text"
            label="Budget"
            value={event.budget}
            placeholder="How much will it cost?"
            validations="isCurrency"
          />
          <TextAreaInput
            name="description"
            form={id}
            value={event.description}
            label="Description"
            placeholder="What else do you need to know?"
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
});

export default EventForm;
