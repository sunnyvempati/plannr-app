include ActionView::Helpers::DateHelper

class EventContactWithEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :event_id

  def name
    object.event.name
  end

  def start_date
    binding.pry
    object.event.start_date
  end
end
