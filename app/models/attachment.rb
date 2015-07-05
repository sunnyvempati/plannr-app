class Attachment < ActiveRecord::Base
  after_save :update_for_uploaded_file
  after_destroy :update_for_destroyed_file

  acts_as_tenant :company
  mount_uploader :file_link, AttachmentFileUploader

  belongs_to :event
  belongs_to :owner, class_name: "User"

  validate :company_limit, :on => :create

  scope :event_attachments, ->(event_id) { where(event_id: event_id)}

  scope :search_in_event, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    event_attachments(event_id).where("lower(attachments.description) LIKE #{wildcard_text} OR lower(attachments.file_name) LIKE #{wildcard_text}")
  }

  def company_limit
    # TODO: need to make sure to check company limit against status
    # attachment_status = company.attachment_status
    # attachment_limit = company.attachment_limit

    # if attachment_status != nil
    #   if attachment_status.put_count > attachment_limit.put_count
    #     errors.add(:file_attachment, 'company is over upload count limit')
    #   end

    #   if attachment_status.space_count > attachment_limit.space_count
    #     errors.add(:file_attachment, 'company is over upload space limit')
    #   end
    # end
  end

  private

  def attachment_status
    AttachmentStatus.where(company: company).first
  end

  MEGABYTE = 1024.0 * 1024.0

  def update_for_uploaded_file
    status = attachment_status
    status.space_count += (file_link.file.size / MEGABYTE).round(4)
    status.put_count += 1
    status.save!
  end

  def update_for_destroyed_file
    status = attachment_status
    status.space_count -= (file_link.file.size / MEGABYTE).round(4)
    status.save!
  end
end
