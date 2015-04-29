class AddAssignToToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :assigned_to, :uuid
  end
end
