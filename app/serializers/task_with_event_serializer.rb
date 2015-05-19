class TaskWithEventSerializer < ActiveModel::Serializer
  attributes :id, :assigned_to, :deadline, :name, :event

  def assigned_to
    "#{object.assigned_to.profile.first_name} #{object.assigned_to.profile.last_name}" if object.assigned_to
  end

  def event
    object.event.name
  end
end
