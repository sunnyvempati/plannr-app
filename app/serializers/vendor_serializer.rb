class VendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :phone, :primary_contact, :description
end
