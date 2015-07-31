require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PlannrApp
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","components-font-awesome","fonts")
    config.react.addons = true
    config.action_controller.default_url_options = { :trailing_slash => true }
    config.active_record.raise_in_transactional_callbacks = true

    main_logger = Log4r::Logger.new "plannr_logger"
    path = File.expand_path("#{Rails.root}/log/#{Rails.env}.log")
    outputter = Log4r::FileOutputter.new('env_file_outputter', filename: path, trunc: false)
    outputter.formatter = Log4r::PatternFormatter.new(
      pattern: "%d|%l|%M", date_pattern: '%FT%T.%L%z')
    main_logger.outputters = [outputter]

    config.logger = Log4r::Logger.get('plannr_logger')
  end
end
