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
  end


  Rack::MiniProfiler.config.position = 'right'

end
