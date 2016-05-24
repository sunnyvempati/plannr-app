class TaskMailer < ApplicationMailer
  default from: 'no-reply@yourplannr.com'

  def send_task_to_user(assigned_from, assigned_to, event, task)
    @assigned_to_name = assigned_to.profile.full_name
    @assigned_from_name = assigned_from.profile.full_name
    @event_name = event.name
    @task = task
    @url = root_url + "#/#{event.id}/tasks"
    attachment = create_calendar_event(task) if task.deadline
    mail.attachments['taskreminder.ics'] = { mime_type: 'application/ics', content: attachment.to_ical } if attachment
    mail(to: assigned_to.email, subject: "Task assigned to you: #{task.name}")
  end

  private

  def create_calendar_event(task)
    cal = Icalendar::Calendar.new
    parsed_date = task.deadline.strftime('%Y%m%d')
    cal.event do |e|
      e.dtstart = Icalendar::Values::Date.new(parsed_date)
      e.dtend = Icalendar::Values::Date.new(parsed_date)
      e.summary = task.name
      e.description = task.description
      e.ip_class = "PRIVATE"
    end
    cal
  end
end
