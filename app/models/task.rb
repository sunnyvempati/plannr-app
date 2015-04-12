class Task < ActiveRecord::Base

  validates :deadline, date: true, allow_blank: true

  belongs_to :event

  validates :event, presence: true

  def self.header
    "Tasks"
  end
end
