class EventContact < ActiveRecord::Base
  belongs_to :contact
  belongs_to :event
end