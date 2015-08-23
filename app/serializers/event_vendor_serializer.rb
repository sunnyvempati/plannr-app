class EventVendorSerializer < ActiveModel::Serializer
  attributes :event_vendors

  def event_vendors
    object.map { |ev| { id: ev.id, event: ev.event, contact: ev.contact } }
  end
end
