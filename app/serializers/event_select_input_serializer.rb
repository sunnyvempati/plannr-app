class EventSelectInputSerializer < ActiveModel::Serializer
  attributes :id, :name, :client, :location, :start_date, :end_date, :budget

  def client
    object.client
  end
end
