class AttachmentSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper
  attributes :id, :file_name, :size

  def size
    number_to_human_size(object.file_link.size)
  end

  def file_attachment
    object.attachment.file_attachment
  end
end
