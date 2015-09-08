class EventExpenseCategorySerializer < ActiveModel::Serializer
  attributes :id,
             :expense_category_name,
             :budget,
             :expense_category_id,
             :event_id,
             :name

  def expense_category_name
    object.expense_category.name
  end

  def name
    object.expense_category.name
  end
end
