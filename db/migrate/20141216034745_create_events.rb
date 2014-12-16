class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events, id: :uuid do |t|
      t.string :name
      t.string :client_name
      t.date :start_date
      t.date :end_date
      t.float :budget
      t.string :location
      t.uuid :user_id

      t.timestamps
    end
  end
end
