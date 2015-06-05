class AddPrimaryContactIdToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :primary_contact_id, :uuid
  end
end
