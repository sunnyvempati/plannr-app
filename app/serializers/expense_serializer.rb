class ExpenseSerializer < ActiveModel::Serializer
  attributes :id,
             :event_expense_category_id,
             :event_expense_category_name,
             :event_vendor_name,
             :event_vendor_id,
             :name,
             :notes,
             :price,
             :quantity,
             :payments,
             :total

  def event_vendor_name
    object.event_vendor.vendor.name if object.event_vendor
  end

  def event_expense_category_name
    object.event_expense_category.expense_category.name if object.event_expense_category
  end

  def total
    object.price * object.quantity
  end
end
