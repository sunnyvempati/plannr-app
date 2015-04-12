class CreateEventVendor < ActiveRecord::Migration
  def change
    create_table :event_vendors, id: :uuid do |t|
      t.uuid :vendor_id, index: true
      t.uuid :event_id, index: true    
    end
  end
end
