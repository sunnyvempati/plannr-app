class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :client, :location, :start_date, :end_date, :budget, :days_till, :status, :description

  def client
    object.client
  end

  def days_till
    if object.start_date
      rational_date = object.start_date - Date.today
      # round to ceiling
      rational_date.ceil
    end
  end
end
