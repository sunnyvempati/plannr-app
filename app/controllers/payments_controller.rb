class PaymentsController < ApplicationController
  include FilterSort
  before_action :authenticate_user
  before_action :find_payment, only: [:destroy, :update, :show]

  def index
    @payments = @filter_sort.find
    render_success @payments
  end

  def create
    @payment = Payment.new(payment_params)
    render_entity @payment
  end

  def show
    render_success @payment
  end

  def update
    render_success @payment if @payment.update_attributes!(payment_params)
  end

  def destroy
    render_success if @payment.destroy
  end

  private

  def find_payment
    @payment = Payment.find(params[:id])
  end

  def payment_params
    params.require(:payment).permit(:expense_id, :due_date, :amount, :method, :paid_date, :notes)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Payment
  end
end
