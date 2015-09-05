class ExpenseSerializer < ActiveModel::Serializer
  attributes :id,
             :event_expense_category_id,
             :vendor_name,
             :vendor_id,
             :name,
             :notes,
             :price,
             :quantity,
             :payments

  def vendor_name
    object.vendor.name
  end
end
