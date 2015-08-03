# Rails 4 expects logger objects to have a formatter method, so we monkey patch
# log4r here
Log4r::Logger.class_eval do
  def formatter
    # Give it the first formatter we have?
    outputters[0].formatter if outputters.any?
  end
end
