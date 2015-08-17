require 'logstash-event'
require 'log4r/formatter/formatter'
require 'log4r/MDC'

class LogstashFormatter < Log4r::BasicFormatter
  def format(event)
    message = format_object(event.data)
    return nil if message.nil? || message.length == 0
    level = Log4r::LNAMES[event.level]
    event = LogStash::Event.new(message: message, level: level)
    user_id = Log4r::MDC.get('user_id')
    session = Log4r::MDC.get('session')
    event[:user_uuid] = user_id unless user_id == ''
    event[:session] = session unless session == ''
    event.to_json
  end
end
