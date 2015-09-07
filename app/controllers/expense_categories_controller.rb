class ExpenseCategoriesController < ApplicationController
  include FilterSort
  before_action :authenticate_user
  before_action :set_expense_category,  only: [:show]

  def index
    @expense_categories = @filter_sort.find
    render_success @expense_categories
  end

  def show
    render_success @expense_category
  end

  def create
    @expense_category = ExpenseCategory.new(expense_category_params)
    render_entity @expense_category
  end

  # def mass_delete
  #   render_success Attachment.destroy_all(id: mass_destroy_params[:ids])
  # end

  private

  def expense_category_params
    params.require(:expense_category).permit(:name)
  end

  def set_expense_category
    @expense_category = ExpenseCategory.find(params[:id])
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    ExpenseCategory
  end
end
