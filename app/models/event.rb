# An event
class Event < ActiveRecord::Base
  include Datify
  acts_as_tenant :company

  date :start_date
  date :end_date

  has_many :event_contacts
  has_many :contacts, through: :event_contacts
  has_many :event_vendors
  has_many :vendors, through: :event_vendors
  has_many :tasks

  validates :name, :start_date, presence: true
  validate :dates

  def self.header
    'Events'
  end

  def other_contacts
    Contact.other_contacts(id)
  end

  protected

  def dates
    errors.add(:start_date, "must be in the future") if formatted_start_date && formatted_start_date < Date.today
    errors.add(:end_date, "must be after start date") if formatted_end_date && formatted_start_date && formatted_start_date > formatted_end_date
  end
end
