class EventVendor < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :event

  validates :event, uniqueness: { scope: :vendor }

  validates :vendor, :event, presence: true

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
          'LOWER(vendors.name) LIKE ?'
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
    when /^vendor_name_/
      includes(:vendor).order("LOWER(vendors.name) #{ direction }")
    when /^email_/
      includes(:vendor).order("LOWER(vendors.email) #{ direction }")
    when /^event_name_/
      includes(:event).order("LOWER(events.email) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  scope :with_event_id, lambda { |event_id|
    includes(:vendor)
      .joins('INNER JOIN vendors ON vendors.id = event_vendors.vendor_id')
      .where("event_id = '#{event_id}'")
  }

  scope :with_vendor_id, lambda { |vendor_id|
    includes(:event)
      .where("vendor_id = '#{vendor_id}'")
  }

  def self.default_filter_options
    {
      sorted_by: 'vendor_name_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      with_event_id
      with_vendor_id
      sorted_by
      search_query
    )
  end
  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
