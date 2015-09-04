class Expense < ActiveRecord::Base
  belongs_to :event
  belongs_to :vendor
  belongs_to :event_expense_category

  has_many :payments

  validates :event_expense_category, presence: true

  # scopes
  scope :with_event_id, lambda { |event_id|
    where(event_id: [event_id]).includes(:event)
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
          'LOWER(expenses.name) LIKE ?'
        ].join(' OR ')
        "(#{ or_clauses })"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
  }

  def self.default_filter_options
    {}
  end

  def self.filter_sort_scopes
    %w(
      search_query
      with_event_id
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes
end
