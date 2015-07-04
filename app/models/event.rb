# An event
class Event < ActiveRecord::Base
  include Commentable
  acts_as_tenant :company

  has_many :event_contacts, dependent: :destroy
  has_many :contacts, through: :event_contacts
  has_many :event_vendors, dependent: :destroy
  has_many :vendors, through: :event_vendors
  has_many :tasks, dependent: :destroy
  has_many :attachments, dependent: :destroy
  belongs_to :owner, class_name: "User"
  belongs_to :client, class_name: "Contact"

  validates :name, presence: true
  validate :dates

  scope :search, ->(term) {
    wildcard_text = "'%#{term.downcase}%'"
    where("lower(events.name) LIKE lower(#{wildcard_text})")
  }

  def other_contacts
    Contact.other_contacts(id)
  end

  def self.header
    'Events'
  end

  protected

  def dates
    errors.add(:start_date, "must be in the future") if start_date && start_date < Date.today
    errors.add(:end_date, "must be after start date") if end_date && start_date && start_date > end_date
  end
end
