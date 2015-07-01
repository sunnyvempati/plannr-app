class AttachmentWithStatus
  attr_reader :attachment

  def initialize(attachment)
    @attachment=attachment
  end

  def save
    @attachment.save
    AttachmentStatus.update_for_uploaded_file(@attachment.company, @attachment.file_link.file.size)
  end

  def destroy
    AttachmentStatus.update_for_destroyed_file(attachment.company, attachment.file_link.file.size)
    @attachment.destroy
  end
end
