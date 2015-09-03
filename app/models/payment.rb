class Payment < ActiveRecord::Base
  include PaymentTypes
  belongs_to :expense

  validates :method, inclusion: { in: [CREDIT, DEBIT, CHECK] }, allow_nil: true
end
