class Event < ActiveRecord::Base
  acts_as_tenant :company

  validates :name, :client_name, presence: true
  validate :event_start_date

  def self.header
    "Events"
  end

  def event_start_date
    if start_date && start_date < Date.today
      errors.add(:start_date, "must be in the future");
    end
  end
end
