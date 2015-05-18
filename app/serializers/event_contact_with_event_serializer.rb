class EventContactWithEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :event_id

  def name
    object.event.name
  end

  def start_date
    object.event.start_date
  end
end
