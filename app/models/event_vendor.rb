class EventVendor < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :event
end
