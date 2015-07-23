class UserVerificationsController < ApplicationController
  before_action :load_user_using_perishable_token, only: [:verify]
  before_action :load_user, only: [:show]

  def show
  end

  def verify
    if @user
      @user.verify!
      flash[:notice] = "Thank you for verifying your account. You may now login."
    else
      flash[:notice] = "Already verified.  Try logging in."
    end
    redirect_to login_url
  end


  private

  def load_user
    @user = User.find(params[:id])
  end

  def load_user_using_perishable_token
    @user = User.find_using_perishable_token(params[:id])
  end
end
