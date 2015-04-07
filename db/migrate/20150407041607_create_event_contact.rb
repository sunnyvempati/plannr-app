class CreateEventContact < ActiveRecord::Migration
  def change
    create_table :event_contacts, id: false do |t|
      t.uuid :contact_id, index: true
      t.uuid :event_id, index: true    
    end
  end
end
