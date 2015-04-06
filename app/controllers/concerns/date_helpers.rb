module DateHelpers
  def convert_us_formatted_string_to_date_type(date)
    begin
      if date.present?
        Date.strptime(date, "%m/%d/%Y")
      end
    rescue
      raise ArgumentError.new("must be a valid date formatted: mm/dd/yyyy")
    end
  end
end

