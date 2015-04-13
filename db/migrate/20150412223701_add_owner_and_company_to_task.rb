class AddOwnerAndCompanyToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :owner_id, :uuid
    add_column :tasks, :company_id, :uuid
  end
end
