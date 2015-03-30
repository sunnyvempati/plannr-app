class CreateContactTypes < ActiveRecord::Migration
  def change
    create_table :contact_types do |t|

      t.timestamps null: false
    end
  end
end
