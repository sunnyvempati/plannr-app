class EventContact < ActiveRecord::Base
  belongs_to :contact
  belongs_to :event

  validates :event, uniqueness: { scope: :contact }

  validates :contact, :event, presence: true

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
          'LOWER(contacts.name) LIKE ?'
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
    when /^contact_name_/
      includes(:contact).order("LOWER(contacts.name) #{ direction }")
    when /^email_/
      includes(:contact).order("LOWER(contacts.email) #{ direction }")
    when /^event_name_/
      includes(:event).order("LOWER(events.email) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  scope :with_event_id, lambda { |event_id|
    includes(:contact)
    .joins('INNER JOIN contacts ON contacts.id = event_contacts.contact_id')
    .where("event_id = '#{event_id}'")
  }

  scope :with_contact_id, lambda { |contact_id|
    includes(:event)
    .where("contact_id = '#{contact_id}'")
  }

  def self.default_filter_options
    {
      sorted_by: 'contact_name_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      with_event_id
      with_contact_id
      sorted_by
      search_query
    )
  end
  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
