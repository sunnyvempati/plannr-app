class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :location
      t.string :phone
      t.string :primary_contact

      t.timestamps null: false
    end
  end
end
