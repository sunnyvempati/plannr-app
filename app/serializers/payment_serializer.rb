class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :due_date, :amount, :paid_date, :payment_method, :notes
end
