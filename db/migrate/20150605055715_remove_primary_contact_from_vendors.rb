class RemovePrimaryContactFromVendors < ActiveRecord::Migration
  def change
    remove_column :vendors, :primary_contact
  end
end
