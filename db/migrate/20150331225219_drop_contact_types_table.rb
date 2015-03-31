class DropContactTypesTable < ActiveRecord::Migration
  def change
    drop_table :contact_types
  end
end
