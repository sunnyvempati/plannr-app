class ExpenseSerializer < ActiveModel::Serializer
  attributes :id,
             :category_name,
             :category_id,
             :vendor_name,
             :vendor_id,
             :name,
             :notes,
             :price,
             :quantity
end
