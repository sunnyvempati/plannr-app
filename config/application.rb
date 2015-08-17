require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
require "log4r/outputter/udpoutputter"
require File.expand_path('../../lib/logstash_formatter', __FILE__)
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PlannrApp
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("node_modules")
    config.react.addons = true
    config.action_controller.default_url_options = { :trailing_slash => true }
    config.active_record.raise_in_transactional_callbacks = true

    main_logger = Log4r::Logger.new "plannr_logger"
    formatter = Log4r::PatternFormatter.new(
      pattern: "%d|%X{session}|%X{user_id}|%l|%M", date_pattern: '%FT%T.%L%z')
    # Regular file output
    path = File.expand_path("#{Rails.root}/log/#{Rails.env}.log")
    outputter = Log4r::FileOutputter.new('env_file_outputter', filename: path, trunc: false)
    outputter.formatter = formatter
    main_logger.outputters = [outputter]

    # Logstash outputter
    logstash_host = ENV['LOGSTASH_PORT_9999_UDP_ADDR'] || ENV['LOGSTASH_HOST']
    logstash_port = ENV['LOGSTASH_PORT_9999_UDP_PORT'] || ENV['LOGSTASH_PORT']
    if logstash_host && logstash_port
      ls_outputter = Log4r::UDPOutputter.new('logstash', hostname: logstash_host, port: logstash_port)
      ls_outputter.formatter = LogstashFormatter.new
      main_logger.outputters << ls_outputter
    end

    # INFO or higher only for production
    if Rails.env.production?
      main_logger.level = Log4r::INFO
      config.log_level = :info
    end

    config.logger = Log4r::Logger.get('plannr_logger')

    config.browserify_rails.commandline_options = "-t babelify --extension=\".jsx\""
    config.browserify_rails.source_map_environments << "development"

    ActiveModel::Serializer.config.adapter = :json
  end
end
