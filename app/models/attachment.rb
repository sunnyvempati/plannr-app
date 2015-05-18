class Attachment < ActiveRecord::Base
  mount_uploader :file_attachment, AttachmentFileUploader

end
