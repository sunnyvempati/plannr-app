class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :type, :description, :organization, :category, :company, :vendor_id

  has_one :vendor

  def type
    if object.category == 1
      "Client"
    else
      "Vendor"
    end
  end

  def company
    return object.organization if object.organization && !object.organization.empty?
    return object.vendor.name if object.vendor
  end
end
