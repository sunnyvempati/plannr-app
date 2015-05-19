class EventVendorWithVendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone, :location, :vendor_id

  def name
    object.vendor.name
  end

  def phone
    object.vendor.phone
  end

  def location
    object.vendor.location
  end
end
