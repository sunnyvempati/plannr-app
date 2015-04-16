class RemoveDatetimeDeadlineFromTasks < ActiveRecord::Migration
  def change
    remove_column :tasks, :deadline
    add_column :tasks, :deadline, :date
  end
end
