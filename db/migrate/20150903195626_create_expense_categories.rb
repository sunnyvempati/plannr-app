class CreateExpenseCategories < ActiveRecord::Migration
  def change
    create_table :expense_categories, id: :uuid do |t|
      t.string :name
      t.uuid :company_id

      t.timestamps null: false
    end
  end
end
