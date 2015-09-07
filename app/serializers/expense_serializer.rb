class ExpenseSerializer < ActiveModel::Serializer
  attributes :id,
             :event_expense_category_id,
             :vendor_name,
             :vendor_id,
             :name,
             :notes,
             :price,
             :quantity,
             :payments,
             :total

  def vendor_name
    object.vendor.name
  end

  def total
    object.price * object.quantity
  end
end
