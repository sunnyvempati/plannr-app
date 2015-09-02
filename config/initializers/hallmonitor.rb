require 'hallmonitor/outputters/influxdb'
require 'socket'

tags = {
  type: "rails",
  role: "application",
  app_name: "plannr-app",
  host: Socket.gethostname.parameterize,
  env: Rails.env
}

user = ENV['PLANNR_INFLUXDB_USER'] || "admin"
pass = ENV['PLANNR_INFLUXDB_PASS'] || "password"
database = ENV['PLANNR_INFLUXDB_DB'] || "metrics"
host = ENV['PLANNR_INFLUXDB_HOST'] || 'influxdb'

client = InfluxDB::Client.new(
  host: host,
  user: user,
  password: pass,
  database: database,
  async: true)

# Hallmonitor.add_outputter Hallmonitor::Outputters::StatsdOutputter.new(prefix, "localhost")
Hallmonitor.add_outputter Hallmonitor::Outputters::InfluxdbOutputter.new(client, tags)

# Set up listeners to auto-monitor action controllers
ActiveSupport::Notifications.subscribe 'process_action.action_controller' do |name, start, finish, id, data|
  duration = (finish - start) * 1000 # To get ms, Time - Time gives fractional seconds
  controller = data[:controller].gsub('Controller', '').underscore.parameterize
  action = data[:action].parameterize

  tags = {
    controller: controller,
    action: action,
    status: data[:status],
  }

  # Two types of responses, success and error
  Hallmonitor::Event.new("controller_action", tags: tags).emit
  Hallmonitor::TimedEvent
    .new("latency", duration, tags: tags.merge({timer_type: "total"}))
    .emit
  Hallmonitor::TimedEvent
    .new("latency", data[:view_runtime], tags: tags.merge({timer_type: "view"}))
    .emit
  Hallmonitor::TimedEvent
    .new("latency", data[:db_runtime], tags: tags.merge({timer_type: "db"}))
    .emit
end
