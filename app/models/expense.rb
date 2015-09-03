class Expense < ActiveRecord::Base
  belongs_to :event
  belongs_to :vendor
  belongs_to :event_category

  has_many :payments
end
