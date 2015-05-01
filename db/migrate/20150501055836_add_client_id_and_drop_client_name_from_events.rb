class AddClientIdAndDropClientNameFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :client_name
    add_column :events, :client_id, :uuid
  end
end
