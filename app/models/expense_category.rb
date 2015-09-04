class ExpenseCategory < ActiveRecord::Base
  acts_as_tenant :company

  has_many :event_expense_categories, dependent: :destroy
  has_many :events, through: :event_expense_categories

  validates :name, presence: true
end
