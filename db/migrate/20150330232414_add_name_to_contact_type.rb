class AddNameToContactType < ActiveRecord::Migration
  def change
    add_column :contact_types, :name, :string
  end
end
