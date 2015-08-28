class UserVerificationsController < ApplicationController
  before_action :load_user_using_perishable_token, only: [:verify]
  before_action :load_user, only: [:create]

  def create
    if @user
      @user.deliver_verification_instructions!
      render_success
    else
      render json: {email: 'not found'}, status: 403
    end
  end

  def verify
    if @user
      @user.verify!
      render_success
    end
  end


  private

  def load_user
    @user = User.find_by_email(params[:email])
  end

  def load_user_using_perishable_token
    @user = User.find_using_perishable_token!(params[:id])
  end
end
