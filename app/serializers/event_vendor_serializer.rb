class EventVendorSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :vendor
  has_one :event

  def name
    object.vendor.name
  end
end
