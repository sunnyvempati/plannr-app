class EventAttachmentWithAttachmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :file_attachment

  def description
    object.attachment.description
  end

  def file_name
    object.attachment.file_name
  end

  def file_attachment
    object.attachment.file_attachment
  end

end
