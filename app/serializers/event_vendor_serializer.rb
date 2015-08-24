class EventVendorSerializer < ActiveModel::Serializer
  attributes :id

  has_one :vendor
  has_one :event
end
