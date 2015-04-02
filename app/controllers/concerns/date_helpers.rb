module DateHelpers
  def convert_date_to_us_format(date)
    begin
      if date.present?
        Date.strptime(date, "%m/%d/%Y")
      end
    rescue
      raise ArgumentError.new("must bea valid date formatted: mm/dd/yyyy")
    end
  end
end

