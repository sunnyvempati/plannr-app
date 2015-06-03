class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments, id: :uuid do |t|
      t.string :body
      t.uuid :commenter_id
      t.integer :commentable_id
      t.string :commentable_type

      t.timestamps null: false
    end
  end
end
