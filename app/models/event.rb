class Event < ActiveRecord::Base
  acts_as_tenant :user

  def self.header
    "Events"
  end
end
