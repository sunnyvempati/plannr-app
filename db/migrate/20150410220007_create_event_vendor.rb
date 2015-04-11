class CreateEventVendor < ActiveRecord::Migration
  def change
    create_table :event_vendors, id: false do |t|
      t.uuid :contact_id, index: true
      t.uuid :event_id, index: true    
    end
  end
end
