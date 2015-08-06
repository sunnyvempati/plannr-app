require 'hallmonitor/outputters/statsd_outputter'
require 'socket'

host = Socket.gethostname.parameterize
env = Rails.env
prefix = "plannr_app.env.#{env}.host.#{host}"

Hallmonitor.add_outputter Hallmonitor::Outputters::StatsdOutputter.new(prefix, "localhost")

# Set up listeners to auto-monitor action controllers
ActiveSupport::Notifications.subscribe 'process_action.action_controller' do |name, start, finish, id, data|
  duration = finish - start
  controller = data[:controller].gsub('Controller', '').underscore.parameterize
  action = data[:action].parameterize

  event_prefix = "controllers.#{controller}.#{action}"
  status_part = (200..399) === data[:status] ? "success" : "error"

  # Two types of responses, success and error
  status_name = "#{event_prefix}.#{status_part}"
  Hallmonitor::Event.new(status_name).emit

  # Only have general timings, not per response type
  Hallmonitor::TimedEvent.new("#{event_prefix}.total", duration).emit
  Hallmonitor::TimedEvent.new("#{event_prefix}.view", data[:view_runtime]).emit
  Hallmonitor::TimedEvent.new("#{event_prefix}.db", data[:db_runtime]).emit
end
