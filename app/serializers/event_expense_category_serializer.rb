class EventExpenseCategorySerializer < ActiveModel::Serializer
  attributes :id,
             :expense_category_name,
             :budget,
             :expense_category_id,
             :event_id,
             :name,
             :expense_total

  def expense_category_name
    object.expense_category.name
  end

  def expense_total
    total = 0
    object.expenses.each {|e| total += e.price*e.quantity}
    total
  end

  def name
    object.expense_category.name
  end
end
