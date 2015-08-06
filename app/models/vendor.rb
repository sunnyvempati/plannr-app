class Vendor < ActiveRecord::Base
  include Commentable
  acts_as_tenant :company

  include Elasticsearch::Model

  # Set up Elastic Search
  mapping do
    indexes :name, type: 'string', index: 'analyzed'
    # Company ID here to allow for tenanted filtering of search
    indexes :company_id, type: 'string', index: 'not_analyzed'
  end

  has_many :event_vendors, dependent: :destroy
  has_many :events, through: :event_vendors
  has_many :contacts
  belongs_to :owner, class_name: 'User'
  belongs_to :primary_contact, class_name: 'Contact'

  validates :name, presence: true
  validates_format_of :phone,
                      :with => %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z},
                      :message => 'must be a phone number in xxx-xxx-xxxx format',
                      :allow_blank => true


  scope :not_in_event_id, lambda { |event_id|
    includes(:primary_contact).where("id not in (select vendor_id from event_vendors where event_id = '#{event_id}')").limit(5)
  }

  scope :with_search_limit, lambda { |num|
    limit(num)
  }

  scope :search_query, lambda { |query|
    return nil  if query.blank?
    terms = query.downcase.split(/\s+/)
    terms = terms.map do |e|
      '%' + e + '%'
    end
    num_or_conditions = 1
    includes(:primary_contact).where(
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
    when /^name_/
      order("LOWER(vendors.name) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'name_desc'
    }
  end

  def self.filter_sort_scopes
    %w(
      sorted_by
      search_query
      not_in_event_id
      with_search_limit
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes

end
