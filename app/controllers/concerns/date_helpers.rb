module DateHelpers
  def convert_date_to_us_format(date)
    begin
      Date.strptime(date, "%m/%d/%Y")
    rescue
      raise ArgumentError.new("must be formatted: mm/dd/yyyy")
    end
  end
end

