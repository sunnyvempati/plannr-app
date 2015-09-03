class ExpenseSerializer < ActiveModel::Serializer
  attributes :id,
             :category_name,
             :event_category_id,
             :vendor_name,
             :vendor_id,
             :name,
             :notes,
             :price,
             :quantity

  def category_name
    object.event_category.category.name
  end

  def vendor_name
    object.vendor.name
  end
end
