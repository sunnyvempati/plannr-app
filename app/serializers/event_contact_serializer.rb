class EventContactSerializer < ActiveModel::Serializer
  attributes :name, :email, :contact_id

  def name
    object.contact.name
  end

  def email
    object.contact.email
  end
end
