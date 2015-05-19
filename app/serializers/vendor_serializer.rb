class VendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :phone
end
