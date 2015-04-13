class Task < ActiveRecord::Base
  acts_as_tenant :company

  validates :deadline, date: true, allow_blank: true
  belongs_to :event
  validates :event, presence: true

  def self.header
    "Tasks"
  end
end
