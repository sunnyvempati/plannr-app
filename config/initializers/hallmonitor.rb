require 'hallmonitor/outputters/statsd_outputter'
require 'socket'

host = Socket.gethostname.parameterize
env = Rails.env
prefix = "plannr_app.env.#{env}.host.#{host}"

Hallmonitor.add_outputter Hallmonitor::Outputters::StatsdOutputter.new(prefix, "localhost")

# Set up listeners to auto-monitor action controllers
ActiveSupport::Notifications.subscribe 'process_action.action_controller' do |name, start, finish, id, data|
  duration = finish - start
  controller = data[:controller].parameterize
  action = data[:action].parameterize

  event_prefix = "controllers.#{controller}.#{action}"
  status_name = "#{event_prefix}.#{data[:status]}"

  Hallmonitor::Event.new(status_name).emit
  Hallmonitor::TimedEvent.new("#{status_name}.total", duration).emit
  Hallmonitor::TimedEvent.new("#{status_name}.view", data[:view_runtime]).emit
  Hallmonitor::TimedEvent.new("#{status_name}.db", data[:db_runtime]).emit
end
