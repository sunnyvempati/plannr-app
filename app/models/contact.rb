class Contact < ActiveRecord::Base
  include ContactTypes
  include Commentable
  acts_as_tenant :company

  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  US_PHONE_REGEX = %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z}
  SEARCH_LIMIT = 5
  has_many :event_contacts, dependent: :destroy
  has_many :events, through: :event_contacts
  belongs_to :vendor
  belongs_to :owner, class_name: "User"

  validates :category, inclusion: { in: [CLIENT, VENDOR] }, allow_nil: true
  validates :name, presence: true
  validates_format_of :email,
                      with: EMAIL_REGEX,
                      message: 'must be an email address',
                      allow_blank: true
  validates_format_of :phone,
                      with: US_PHONE_REGEX,
                      message: 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      allow_blank: true
  validates_uniqueness_to_tenant :email,
                                 allow_blank: true,
                                 allow_nil: true,
                                 message: 'this email already exists in your company'

  scope :not_in, ->(event_id) {
      where("id not in (select contact_id from event_contacts where event_id = '#{event_id}')")
  }

  scope :search_not_in, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    Contact.not_in(event_id)
      .where("lower(contacts.name) LIKE lower(#{wildcard_text})")
      .limit(5)
  }

  scope :search_clients, ->(term) {
    wildcard_text = "'%#{term.downcase}%'"
    where("lower(contacts.name) LIKE lower(#{wildcard_text})
        AND contacts.category = 1")
    .limit(5)
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
          'LOWER(contacts.name) LIKE ?'
        ].join(' OR ')
        "(#{ or_clauses })"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    ).includes(:vendor)
  }

  scope :sorted_by, lambda { |sort_option|
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^name_/
      order("LOWER(contacts.name) #{ direction }")
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

end
