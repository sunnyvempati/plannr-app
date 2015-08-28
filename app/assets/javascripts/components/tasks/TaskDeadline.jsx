import classNames from 'classnames';

export default {
  taskDuedateNotification: {
    overdue: 0,
    approaching: 7
  },
  dayDiff: function (first, second) {
    // the difference in days from the first date to the second date
    return (second-first)/(1000*60*60*24);
  },
  renderDeadlineIcon: function (deadlineString, optionalClass) {
    //Javascript assumes a date in YYYY-MM-DD is in UTC and will convert it to local time; I don't want this
    //see here: http://stackoverflow.com/questions/15517024/how-to-assume-local-time-zone-when-parsing-iso-8601-date-string
    var deadline = new Date(deadlineString);
    deadline = new Date( deadline.getTime() + ( deadline.getTimezoneOffset() * 60000 ) );

    var daysUntilDue = NaN;
    if (deadlineString != null) {
      daysUntilDue = this.dayDiff(Date.now(), deadline);
    }
    var isOverdue = (daysUntilDue <= this.taskDuedateNotification.overdue);
    var isApproaching = (this.taskDuedateNotification.overdue < daysUntilDue  && daysUntilDue  <= this.taskDuedateNotification.approaching);

    var deadlineIconClasses = {
      'DeadlineIcon': true,
      'fa': true,
      'fa-clock-o': true,
      'fa-lg': true,
      'is-overdue': isOverdue,
      'is-approaching': isApproaching
    };
    if (optionalClass) deadlineIconClasses[optionalClass] = true;

    return (<i className={classNames(deadlineIconClasses)}></i>);
  }
}
