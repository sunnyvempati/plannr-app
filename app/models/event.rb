# An event
class Event < ActiveRecord::Base
  include Commentable
  acts_as_tenant :company

  has_many :event_contacts, dependent: :destroy
  has_many :contacts, through: :event_contacts
  has_many :event_vendors, dependent: :destroy
  has_many :vendors, through: :event_vendors
  has_many :tasks, dependent: :destroy
  has_many :attachments, dependent: :destroy
  belongs_to :owner, class_name: "User"
  belongs_to :client, class_name: "Contact"

  validates :name, presence: true
  validate :dates

  include EventStatuses
  validates :status, inclusion: { in: [ACTIVE, ARCHIVED] }

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
          'LOWER(events.name) LIKE ?'
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
      order("LOWER(events.name) #{ direction }")
    when /^start_date_/
      order("events.start_date #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'name_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      sorted_by
      search_query
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes

  protected

  def dates
    errors.add(:start_date, "must be in the future") if start_date && start_date < Date.today
    errors.add(:end_date, "must be after start date") if end_date && start_date && start_date > end_date
  end
end
