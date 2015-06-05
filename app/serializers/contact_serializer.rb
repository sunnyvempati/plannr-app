class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :company, :type, :description

  def type
    if object.category == 1
      "Client"
    else
      "Vendor"
    end
  end

  def company
    return object.organization ? object.organization : object.vendor.name
  end
end
