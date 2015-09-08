class ExpensesController < ApplicationController
  include FilterSort
  before_action :authenticate_user
  before_action :find_expense, only: [:destroy, :update, :show]
  before_action :set_event_vendor, only: [:create, :update]

  def index
    @expenses = @filter_sort.find
    render_success @expenses
  end

  def create
    @expense = Expense.new(expense_params)
    @expense.event_vendor = @event_vendor
    render_entity @expense
  end

  def show
    render_success @expense
  end

  def update
    if @event_vendor
      update_params = expense_params
      update_params.merge!(event_vendor_id: @event_vendor.id)
    end
    render_success @expense if @expense.update_attributes!(update_params)
  end

  def destroy
    render_success if @expense.destroy
  end

  private

  def find_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense).permit(:name, :event_expense_category_id, :notes, :price, :quantity)
  end

  def set_event_vendor
    @event_vendor = nil
    vendor_id = params[:expense][:vendor_id]
    if vendor_id
      @event_vendor = EventVendor.find_or_create_by!(event_id: params[:event_id], vendor_id: vendor_id)
    end
    @event_vendor
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Expense
  end
end
