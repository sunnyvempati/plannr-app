class Payment < ActiveRecord::Base
  include PaymentTypes
  belongs_to :expense

  validates :payment_method, inclusion: { in: [CREDIT, DEBIT, CHECK] }, allow_nil: true
end
