class AddDescriptionToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :description, :text
  end
end
