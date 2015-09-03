class CreateEventCategories < ActiveRecord::Migration
  def change
    create_table :event_categories, id: :uuid do |t|
      t.uuid :event_id
      t.uuid :category_id
      t.decimal :budget

      t.timestamps null: false
    end
  end
end
