require 'log4r/outputter/udpoutputter'

class LogstashOutputter < Log4r::UDPOutputter
  def write(data)
    super(data) unless data.nil?
  end
end
