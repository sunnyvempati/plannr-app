class EventExpenseCategorySerializer < ActiveModel::Serializer
  attributes :id,
             :expense_category_name,
             :budget,
             :expense_category_id,
             :event_id

  def expense_category_name
    object.expense_category.name
  end
end
