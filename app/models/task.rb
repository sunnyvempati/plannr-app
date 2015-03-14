class Task < ActiveRecord::Base

  validates :deadline, date: true, allow_blank: true

  def self.header
    "Tasks"
  end
end
