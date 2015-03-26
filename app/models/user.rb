class User < ActiveRecord::Base
  acts_as_authentic  # authlogic

  has_one :profile
  has_many :events
  belongs_to :company
end
