class Task < ActiveRecord::Base
  acts_as_tenant :company
  belongs_to :event
  belongs_to :owner, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User'

  validates :name, :event, presence: true
  validate :deadline_in_future

  # scopes
  scope :event_tasks, ->(event_id) { where(event_id: event_id)}

  scope :search_in_event, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    event_tasks(event_id).where("lower(tasks.name) LIKE #{wildcard_text}")
  }

  scope :search, ->(term) {
    wildcard_text = "'%#{term}%'"
    where("lower(tasks.name) LIKE #{wildcard_text}")
  }

  def self.header
    "Tasks"
  end

  def deadline_in_future
    if deadline && deadline < Date.today
      errors.add(:deadline, "must be in the future");
    end
  end
end
