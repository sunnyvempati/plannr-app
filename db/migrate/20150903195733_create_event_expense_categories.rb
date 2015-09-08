class CreateEventExpenseCategories < ActiveRecord::Migration
  def change
    create_table :event_expense_categories, id: :uuid do |t|
      t.uuid :event_id
      t.uuid :expense_category_id
      t.float :budget

      t.timestamps null: false
    end
  end
end
