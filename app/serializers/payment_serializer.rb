class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :paid_date, :due_date, :amount, :type, :type_display

  def type_display
    case object.type
    when 1
      "Credit"
    when 2
      "Debit"
    when 3
      "Check"
    else ""
    end
  end
end
