class AttachmentSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper
  attributes :id, :file_name, :size, :url

  def size
    number_to_human_size(object.file_link.size)
  end

  def url
    object.file_link.url
  end
end
