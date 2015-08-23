class EventContactSerializer < ActiveModel::Serializer
  attributes :id

  has_one :contact
  has_one :event
end
