class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments, id: :uuid do |t|
      t.string :name
      t.string :file_attachment
      t.uuid :owner_id
      t.uuid :company_id

      t.timestamps null: false
    end
  end
end
