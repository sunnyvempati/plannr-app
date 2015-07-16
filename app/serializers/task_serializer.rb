class TaskSerializer < ActiveModel::Serializer
  attributes :id, :assigned_to, :deadline, :name, :status, :assigned_to_id, :description, :event_id

  def assigned_to
    "#{object.assigned_to.profile.first_name} #{object.assigned_to.profile.last_name}" if object.assigned_to
  end

  def status
    case object.status
    when TaskStatuses::TODO
      'To do'
    when TaskStatuses::COMPLETED
      'Completed'
    else
      ''
    end
  end
end
