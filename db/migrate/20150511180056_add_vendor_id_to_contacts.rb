class AddVendorIdToContacts < ActiveRecord::Migration
  def change
   add_column :contacts, :vendor_id, :uuid
 end
end
