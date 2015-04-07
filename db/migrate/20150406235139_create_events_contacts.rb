class CreateEventsContacts < ActiveRecord::Migration
  def change
    create_table :events_contacts, id: false do |t|
      t.belongs_to :event, index: true
      t.belongs_to :contact, index: true
    end
  end
end
