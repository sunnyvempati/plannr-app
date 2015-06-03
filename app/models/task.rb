class Task < ActiveRecord::Base
  include Filterable
  acts_as_tenant :company
  belongs_to :event
  belongs_to :owner, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User'

  validates :name, :event, presence: true
  validate :deadline_in_future

  include TaskStatuses
  validates :status, inclusion: { in: [NEW, IN_PROGRESS, COMPLETED] }

  # scopes
  scope :event_tasks, ->(event_id) { where(event_id: event_id)}

  scope :search_in_event, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    event_tasks(event_id).where("lower(tasks.name) LIKE lower(#{wildcard_text})")
  }

  scope :search, ->(term) {
    wildcard_text = "'%#{term}%'"
    where("lower(tasks.name) LIKE lower(#{wildcard_text})")
  }

  # scope :completed, -> { where(status: COMPLETE) }
  # scope :completed_for_event, ->(event_id) {
  #   completed.where(event_id: event_id)
  # }
  # scope :user_tasks, ->(user_id) {
  #   where(assigned_to: user_id)
  # }
  # scope :user_tasks_for_event, ->(user_id, event_id) {
  #   user_tasks.where(event: event_id)
  # }

  def self.header
    "Tasks"
  end

  def deadline_in_future
    if deadline && deadline < Date.today
      errors.add(:deadline, "must be in the future");
    end
  end
end
