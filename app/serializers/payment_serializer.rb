class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :due_date, :amount, :paid_date, :type

  def type
    object.method
  end
end
