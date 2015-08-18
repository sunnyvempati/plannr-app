import EventForm from './EventForm';

class EventFormNew extends React.Component {
  componentDidMount() {
    this.props.setLayoutParams({header: "Create Event", skrollable: true});
  }

  render() {
    return (
      <EventForm model={{}} type="NEW" />
    );
  }
}

export default EventFormNew;
