class EventCategory < ActiveRecord::Base
  belongs_to :category
  belongs_to :event

  validates :event, uniqueness: { scope: :category }

  validates :event, :category, presence: true
end
