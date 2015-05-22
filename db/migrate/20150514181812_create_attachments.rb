class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments, id: :uuid do |t|
      t.string :file_name
      t.string :file_extension
      t.string :file_link
      t.text :description
      t.uuid :event_id
      t.uuid :owner_id
      t.uuid :company_id

      t.timestamps null: false
    end
  end
end
