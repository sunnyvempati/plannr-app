class Event < ActiveRecord::Base
  acts_as_tenant :company

  validates :name, presence: true
  validate :event_start_date
  validate :event_end_date

  def self.header
    "Events"
  end

  def event_start_date
    if start_date && start_date < Date.today
      errors.add(:start_date, "must be in the future");
    end
  end

  def event_end_date
    if end_date && end_date < Date.today
      errors.add(:end_date, "must be in the future");
    end

    if start_date && end_date && end_date < start_date
      errors.add(:end_date, "must be equal to or later than Start Date");
    end
  end
end
