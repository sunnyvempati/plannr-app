class Category < ActiveRecord::Base
  acts_as_tenant :company

  has_many :event_categories, dependent: :destroy
  has_many :events, through: :event_categories

  validates :name, presence: true
end
