class Task < ActiveRecord::Base
  include Datify
  acts_as_tenant :company
  belongs_to :event
  belongs_to :owner, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User'

  date :deadline

  validates :name, :event, presence: true
  validate :deadline_in_future

  # scopes
  scope :event_tasks, ->(event_id) { where(event_id: event_id)}

  def self.header
    "Tasks"
  end

  def deadline_in_future
    # use formatted_deadline for formatted date
    if formatted_deadline && formatted_deadline < Date.today
      errors.add(:deadline, "must be in the future");
    end
  end
end
