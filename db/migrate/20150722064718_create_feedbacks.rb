class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.uuid :sender_id, null: false
      t.text :message
      t.timestamps null: false
    end
  end
end
