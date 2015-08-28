class VendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :phone, :primary_contact_id, :description, :primary_contact
end
