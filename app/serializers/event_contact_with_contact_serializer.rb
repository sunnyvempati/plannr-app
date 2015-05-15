class EventContactWithContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone, :email, :contact_id

  def name
    object.contact.name
  end

  def email
    object.contact.email
  end

  def phone
    object.contact.phone
  end
end
