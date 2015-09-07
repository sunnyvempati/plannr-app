class EventExpenseCategory < ActiveRecord::Base
  belongs_to :expense_category
  belongs_to :event

  validates :event, uniqueness: { scope: :expense_category }

  validates :event, :expense_category, presence: true

  scope :with_event_id, lambda { |event_id|
    includes(:expense_category)
      .joins('INNER JOIN expense_categories ON expense_categories.id = event_expense_categories.expense_category_id')
      .where("event_id = '#{event_id}'")
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
    when /^expense_category_name_/
      includes(:expense_category).order("LOWER(expense_categories.name) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'expense_category_name_asc'
    }
  end

  def self.filter_sort_scopes
    %w(
      search_query
      with_event_id
      sorted_by
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
