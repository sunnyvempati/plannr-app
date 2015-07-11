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
    params.require(:filter_sort).permit(model.filter_sort_scopes) if params[:filter_sort]
  end
end
