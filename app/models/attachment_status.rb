class AttachmentStatus < ActiveRecord::Base
  belongs_to :company

  def self.update_for_uploaded_file(company, file_size)
    # increment put_count and add to space_count
    attachment_status = AttachmentStatus.find_or_create_by(company: company)
    attachment_status.space_count += self.convert_bytes_to_megabytes(file_size) #convert size from bytes to MB
    attachment_status.put_count += 1
    attachment_status.save
  end

  def self.update_for_destroyed_file(company, file_size)
    # subtract from space_count
    attachment_status = AttachmentStatus.find_or_create_by(company: company)
    attachment_status.space_count -= self.convert_bytes_to_megabytes(file_size) #convert size from bytes to MB
    attachment_status.save
  end

  private

  def convert_bytes_to_megabytes(bytes)
    (bytes / MEGABYTE)
  end
end
