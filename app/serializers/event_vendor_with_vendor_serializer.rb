class EventVendorWithVendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :vendor_id

  def name
    object.vendor.name
  end
end
