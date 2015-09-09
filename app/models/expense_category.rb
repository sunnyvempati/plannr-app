class ExpenseCategory < ActiveRecord::Base
  acts_as_tenant :company

  has_many :event_expense_categories, dependent: :destroy
  has_many :events, through: :event_expense_categories

  validates :name, presence: true

  scope :not_in_event_id, lambda { |event_id|
    where("id not in (select expense_category_id from event_expense_categories where event_id = '#{event_id}')")
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
          'LOWER(expense_categories.name) LIKE ?'
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
      order("LOWER(expense_categories.name) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_expense_categories
    [
      'Audio/Visual & Technical',
      'Booth Rental',
      'Catering & Beverage',
      'Design & Decor',
      'Entertainment',
      'Facilities & Campus Services',
      'Parking/Transportation',
      'Travel',
      'Lodging',
      'Photography/Video',
      'Postage/Mail/Shipping',
      'Publicity/Marketing',
      'Rentals',
      'Security/Safety',
      'Signage',
      'Supplies & Miscellaneous',
      'Venue',
      'Miscellaneous Contingency',
      'Other'
    ]
  end

  def self.default_filter_options
    {
      sorted_by: 'name_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      search_query
      sorted_by
      not_in_event_id
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
