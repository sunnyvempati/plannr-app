module Datify
  extend ActiveSupport::Concern
  def self.included(base)
    base.send :extend, ClassMethods
  end

  module ClassMethods
    def date(date_attr)
      send :validate, "#{date_attr}_format".to_sym
      define_method("#{date_attr}=") do |date_set|
        begin
          date_result = !date_set || date_set.is_a?(Date) ? date_set : Date.strptime(date_set, "%m/%d/%Y")
          write_attribute(date_attr, date_result) if date_attr && !date_attr.is_a?(Date)
          instance_variable_set("@#{date_attr}_error", nil)
        rescue
          write_attribute(date_attr, nil)
          instance_variable_set("@#{date_attr}_error", "Format must be mm/dd/yyyy")
        end
      end
      define_method("#{date_attr}") do
        self.read_attribute("#{date_attr}".to_sym).to_s
      end
      define_method("formatted_#{date_attr}") do
        self.read_attribute("#{date_attr}".to_sym)
      end
      define_method("#{date_attr}_format") do
        error = instance_variable_get("@#{date_attr}_error")
        errors.add(date_attr, error) if error
      end
    end
  end
end
