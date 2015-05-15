class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :organization, :type

  def type
    if object.category == 1
      "Client"
    else
      "Vendor"
    end
  end
end
