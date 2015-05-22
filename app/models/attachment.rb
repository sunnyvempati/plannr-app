class Attachment < ActiveRecord::Base
  mount_base64_uploader :file_link, AttachmentFileUploader
  belongs_to :event
  acts_as_tenant :company

  validate :company_not_over_limits, :on => :create

  after_save do |attachment|
    AttachmentStatus.update_for_uploaded_file(attachment.company, attachment.file_link.file.size)
  end

  before_destroy do |attachment|
    AttachmentStatus.update_for_destroyed_file(attachment.company, attachment.file_link.file.size)
  end

  # TODO: event_attachment (and task_attachments) aren't good names, change them
  scope :event_attachments, ->(event_id) { where(event_id: event_id)}

  scope :search_in_event, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    event_attachments(event_id).where("lower(attachments.description) LIKE #{wildcard_text} OR lower(attachments.file_name) LIKE #{wildcard_text}")
  }

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

  # def self.quick_create(name, file_attachment, event_id)
  #   new(name: name, email: file_attachment, event_id: event_id)
  # end

end
