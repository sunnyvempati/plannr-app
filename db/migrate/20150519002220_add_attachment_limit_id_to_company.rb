class AddAttachmentLimitIdToCompany < ActiveRecord::Migration
  def change
    add_column :companies, :attachment_limit_id, :uuid
  end
end
