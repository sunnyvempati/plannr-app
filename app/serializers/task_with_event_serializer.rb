class TaskWithEventSerializer < ActiveModel::Serializer
  attributes :id, :assigned_to, :deadline, :name, :event, :status

  def assigned_to
    "#{object.assigned_to.profile.first_name} #{object.assigned_to.profile.last_name}" if object.assigned_to
  end

  def event
    object.event.name
  end

  def status
    case object.status
    when TaskStatuses::NEW
      'New'
    when TaskStatuses::IN_PROGRESS
      'In Progress'
    when TaskStatuses::COMPLETED
      'Completed'
    else
      ''
    end
  end
end
