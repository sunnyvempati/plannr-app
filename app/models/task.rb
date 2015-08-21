class Task < ActiveRecord::Base
  include Commentable
  acts_as_tenant :company

  belongs_to :event
  belongs_to :owner, class_name: 'User'
  belongs_to :assigned_to, class_name: 'User'

  validates :name, :event, presence: true

  include TaskStatuses
  validates :status, inclusion: { in: [TODO, COMPLETED] }

  # scopes
  scope :with_event_id, lambda { |event_id|
    where(event_id: [event_id]).includes(:event)
  }

  scope :with_status, lambda { |status|
    where(status: status)
  }

  scope :with_assigned_to, lambda { |user|
    where(assigned_to: user).includes(:assigned_to)
  }

  scope :search_query, lambda { |query|
    return nil  if query.blank?
    terms = query.downcase.split(/\s+/)
    terms = terms.map do |e|
      '%' + e + '%'
    end
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
      order("LOWER(tasks.name) #{ direction }, tasks.created_at asc")
    when /^deadline_/
      order("tasks.deadline #{ direction }, tasks.created_at asc")
    when /^status_/
      order("tasks.status #{ direction }, tasks.created_at asc")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'deadline_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      sorted_by
      search_query
      with_event_id
      with_status
      with_assigned_to
    )
  end
  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
