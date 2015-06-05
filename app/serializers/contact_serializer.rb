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
    return object.organization if object.organization
    return object.vendor.name if object.vendor
  end
end
