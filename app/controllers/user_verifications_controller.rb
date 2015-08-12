class UserVerificationsController < ApplicationController
  before_action :load_user_using_perishable_token, only: [:verify]
  before_action :load_user, only: [:show]

  def show
  end

  def verify
    if @user
      @user.verify!
      render_success message: "Thank you for verifying your account. You may now login."
    else
      render_error message: "Already verified.  Try logging in."
    end
  end


  private

  def load_user
    @user = User.find(params[:id])
  end

  def load_user_using_perishable_token
    @user = User.find_using_perishable_token(params[:id])
  end
end
