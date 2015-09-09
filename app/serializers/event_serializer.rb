class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :client, :location, :start_date, :end_date, :budget_totals, :days_till, :status, :description, :parent_id, :client_id

  def days_till
    if object.start_date
      rational_date = object.start_date - Date.today
      # round to ceiling
      rational_date.ceil
    end
  end

  def budget_totals
    total = object.budget
    estimated = 0
    expense_total = 0
    remaining = 0
    if object.event_expense_categories
      object.event_expense_categories.each do |ec|
        expenses = Expense.where(event_expense_category_id: ec.id)
        expenses.each{|e| expense_total += e.price}
        estimated += ec.budget
      end
    end

    {
      total: total,
      estimated: estimated,
      expenses: expense_total
    }
  end
end
