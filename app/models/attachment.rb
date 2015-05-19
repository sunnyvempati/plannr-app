class Attachment < ActiveRecord::Base
  mount_uploader :file_attachment, AttachmentFileUploader
  acts_as_tenant :company

  validate :company_not_over_limits, :on => :create

  def company_not_over_limits
    attachment_status =  self.company.attachment_status
    attachment_limit = self.company.attachment_limit

    if attachment_status != nil
      if attachment_status.put_count > attachment_limit.put_count
        errors.add(:file_attachment, 'company is over upload count limit')
      end

      if attachment_status.space_count > attachment_limit.space_count
        errors.add(:file_attachment, 'company is over upload space limit')
      end
    end

  end

end
