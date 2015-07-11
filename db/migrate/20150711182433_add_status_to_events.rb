class AddStatusToEvents < ActiveRecord::Migration
  def change
    add_column :events, :status, :integer, default: 1
  end
end
