class AddParentIdToEvents < ActiveRecord::Migration
  def change
    add_column :events, :parent_id, :uuid
  end
end
