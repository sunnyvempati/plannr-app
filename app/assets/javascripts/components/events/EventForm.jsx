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

var EventForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      startDate: this.props.model.start_date ? moment(this.props.model.start_date) : null,
      model: this.props.model
    };
  },
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
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
    this.setState({startDate: date});
  },
  onSecondaryClick: function() {
    RouteActions.redirect('events');
  },
  massageDataAndSubmit: function(data, reset, invalidate) {
    data.event.start_date = data.event.start_date && data.event.start_date.format();
    data.event.end_date = data.event.end_date && data.event.end_date.format();
    var budget = data.event.budget;
    budget = !!budget && budget.toString().replace('$','').replace(/,/g,'');
    data.event.budget = budget;
    // this.props.routeVerb == "POST" ? this.postForm(data, reset, invalidate) : this.putForm(data, reset, invalidate);
    // to do
    console.log(data);
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
    var endDate = this.props.model.end_date ? moment(this.props.model.end_date) : null;
    var primaryButtonText = this.props.type == "NEW" ? "Create" : "Update";
    return (
      <div className="FormContainer--leftAligned">
        <Form mapping={this.mapInputs}
              onSubmit={this.massageDataAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id={id}>
          {this.renderTemplateFields()}
          <FormInput
            name="name"
            id="event_name"
            autofocus="autofocus"
            placeholder="Give it a unique name"
            type="text"
            label="Name*"
            value={this.state.model.name}
            required
          />
          <DatePickerInput
            name="start_date"
            label="Start Date"
            value={this.state.startDate}
            placeholder="When does it start?"
            onValueSet={this.setStartDate}
            minDate={moment()}
          />
          <DatePickerInput
            name="end_date"
            label="End Date"
            value={endDate}
            placeholder="When does it end?"
            minDate={this.state.startDate}
          />
          <FormInput
            name="location"
            id="event_location"
            type="text"
            label="Location"
            value={this.state.model.location}
            placeholder="Where will it be held?"
          />
          <EventClientInput
            name='client'
            value={this.state.model.client_id}
            id='event_client'
            label='Client' />
          <FormInput
            name="budget"
            id="event_budget"
            type="text"
            label="Budget"
            value={this.state.model.budget}
            placeholder="How much will it cost?"
            validations="isCurrency"
          />
          <TextAreaInput
            name="description"
            form={id}
            value={this.state.model.description}
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
