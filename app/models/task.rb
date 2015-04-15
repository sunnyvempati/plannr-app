class Task < ActiveRecord::Base
  acts_as_tenant :company

  belongs_to :event

  validates :name, :event, presence: true
  validate :task_deadline

  def self.header
    "Tasks"
  end

  def task_deadline
    if deadline && deadline < Date.today
      errors.add(:deadline, "must be in the future");
    end
  end
end
