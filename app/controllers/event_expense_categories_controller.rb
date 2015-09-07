class EventExpenseCategoriesController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    @event_expense_categories = @filter_sort.find
    render_success @event_expense_categories
  end

  def create
    @event_expense_category = EventExpenseCategory.new(event_expense_category_params)
    render_entity @event_expense_category
  end

  # def mass_delete
  #   render_success Attachment.destroy_all(id: mass_destroy_params[:ids])
  # end

  private

  def event_expense_category_params
    params.require(:event_expense_category).permit(:expense_category_id, :event_id, :budget)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    EventExpenseCategory
  end
end
