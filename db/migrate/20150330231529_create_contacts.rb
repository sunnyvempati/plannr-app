class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :company
      t.text :description
      t.integer :contact_type

      t.timestamps null: false
    end
  end
end
