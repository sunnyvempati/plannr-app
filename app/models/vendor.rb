class Vendor < ActiveRecord::Base
  acts_as_tenant :company
  validates :name, presence: true
end

