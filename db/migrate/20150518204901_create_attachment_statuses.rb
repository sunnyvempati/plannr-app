class CreateAttachmentStatuses < ActiveRecord::Migration
  def change
    create_table :attachment_statuses, id: :uuid do |t|
      t.integer :get_count, :default => 0
      t.integer :put_count, :default => 0
      t.float :space_count, :default => 0.0

      t.uuid :company_id

      t.timestamps null: false
    end
  end
end
