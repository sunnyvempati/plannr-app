import EventForm from './EventForm';
import PageTitleActions from '../../actions/PageTitleActions';

class EventFormNew extends React.Component {
  componentDidMount() {
    PageTitleActions.setPageTitle("Create Event", true);
  }

  render() {
    return (
      <EventForm model={{}} type="NEW" />
    );
  }
}

export default EventFormNew;
