class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :planner
      t.uuid :user_id

      t.timestamps
    end
  end
end
