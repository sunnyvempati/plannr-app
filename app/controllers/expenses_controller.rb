class ExpensesController < ApplicationController
  include FilterSort
  before_action :authenticate_user
  before_action :find_expense, only: [:destroy, :update, :show]

  def index
    @expenses = @filter_sort.find
    render_success @expenses
  end

  def create
    @expense = Expense.new(expense_params)
    render_entity @expense
  end

  def show
    render_success @expense
  end

  def update
    render_success @expense if @expense.update_attributes!(expense_params)
  end

  def destroy
    render_success if @expense.destroy
  end

  private

  def find_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    # to do
    params.require(:expense).permit(:name, :event_vendor_id, :event_expense_category_id, :notes, :price, :quantity)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Expense
  end
end
