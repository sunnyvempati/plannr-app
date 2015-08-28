import EventForm from './EventForm';
import EventStore from '../../stores/EventStore';
import EventActions from '../../actions/EventActions';
import PageTitleActions from '../../actions/PageTitleActions';

var EventFormEdit = React.createClass({
  getEventState() {
    return {
      event: EventStore.get(this.props.params.id) || null
    }
  },
  getInitialState: function() {
    return this.getEventState();
  },
  componentDidMount() {
    PageTitleActions.setPageTitle("Edit Event", true);
    EventStore.addChangeListener(this._onChange);
    if (!this.state.event) EventActions.get(this.props.params.id);
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(this.getEventState());
  },
  render() {
    return (
      <EventForm model={this.state.event} type="OLD" />
    );
  }
});

export default EventFormEdit;
