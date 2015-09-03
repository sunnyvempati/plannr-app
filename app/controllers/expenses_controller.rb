class ExpensesController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    @expenses = @filter_sort.find.page(params[:page])
    render_success @expenses
  end

  def create
    # get company attachment status (size)
    # get file size of the to-be created attachment
    # do a check
    # if all good - create
    # once you create, update company attachment status
    # if not - error
    # @attachment = Attachment.new(attachment_params)
    # render_entity @attachment
  end

  # def mass_delete
  #   render_success Attachment.destroy_all(id: mass_destroy_params[:ids])
  # end

  private

  def expense_params
    # to do
    # params.require(:expense)
    #       .permit(:name, :email, :category, :phone, :organization, :description, :vendor_id)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Expense
  end
end
