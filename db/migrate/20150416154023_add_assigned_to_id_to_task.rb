class AddAssignedToIdToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :assigned_to_id, :uuid
  end
end
