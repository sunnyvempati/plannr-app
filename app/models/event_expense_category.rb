class EventExpenseCategory < ActiveRecord::Base
  belongs_to :expense_category
  belongs_to :event

  validates :event, uniqueness: { scope: :expense_category }

  validates :event, :expense_category, presence: true
end
