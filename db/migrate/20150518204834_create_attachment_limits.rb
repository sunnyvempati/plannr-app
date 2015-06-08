class CreateAttachmentLimits < ActiveRecord::Migration
  def change
    create_table :attachment_limits, id: :uuid do |t|
      t.integer :get_count
      t.integer :put_count
      t.integer :space_count

      t.timestamps null: false
    end
  end
end
