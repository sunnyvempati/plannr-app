class Task < ActiveRecord::Base
  # include Filterable
  acts_as_tenant :company

  filterrific default_filter_params: { sorted_by: 'deadline_desc' },
              available_filters: %w(
                sorted_by
                search_query
                with_event_id
                with_status
                with_assigned_to
              )

  belongs_to :event
  belongs_to :owner, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User'

  validates :name, :event, presence: true

  include TaskStatuses
  validates :status, inclusion: { in: [TODO, COMPLETED] }

  # scopes
  scope :with_event_id, lambda { |event_id|
    where(event_id: [event_id])
  }

  scope :with_status, lambda { |status|
    where(status: status)
  }

  scope :with_assigned_to, lambda { |user|
    where(assigned_to: user)
  }

  scope :search_query, lambda { |query|
    return nil  if query.blank?
    # condition query, parse into individual keywords
    terms = query.downcase.split(/\s+/)
    # replace "*" with "%" for wildcard searches,
    # append '%', remove duplicate '%'s
    # configure number of OR conditions for provision
    # of interpolation arguments. Adjust this if you
    # change the number of OR conditions.
    num_or_conditions = 1
    where(
      terms.map do
        or_clauses = [
          'LOWER(tasks.name) LIKE ?'
        ].join(' OR ')
        "(#{ or_clauses })"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
  }

  scope :sorted_by, lambda { |sort_option|
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^name_/
      order("LOWER(tasks.name) #{ direction }")
    when /^deadline_/
      order("tasks.deadline #{ direction }")
    when /^status_/
      order("tasks.status #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.header
    "Tasks"
  end
end
