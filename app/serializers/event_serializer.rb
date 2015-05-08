class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :client, :location, :start_date, :end_date, :budget, :days_till

  def client
    object.client
  end

  def days_till
    rational_date = object.formatted_start_date - Date.today
    # round to ceiling
    rational_date.ceil
  end
end