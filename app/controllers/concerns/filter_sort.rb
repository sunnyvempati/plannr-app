# used for Filterrific functionality
module FilterSort
  extend ActiveSupport::Concern

  included do
    before_action :initialize_filter_sort, only: [:index]
  end

  def initialize_filter_sort
    @filter_sort = initialize_filterrific(
      model,
      filter_sort_params
    ) || return
  end

  private

  def filter_sort_params
    Hash[model.filter_sort_scopes.map { |s| [s, params[s]] }]
  end
end
