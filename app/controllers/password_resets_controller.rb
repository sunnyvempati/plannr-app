class PasswordResetsController < ApplicationController
  before_filter :load_user_using_perishable_token, :only => [ :update ]

  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user
      @user.deliver_password_reset_instructions!
      flash[:notice] =
      render_success({message: "Instructions to reset your password have been emailed to you"})
    else
      render_error({email: "not found. Try a different one."})
    end
  end

  def update
    @user.password = reset_params[:password]
    @user.password_confirmation = reset_params[:password_confirmation]
    if @user.save
      render_success({message: "Your password was successfully updated"})
    else
      render_error(errors_hash(@user.errors))
    end
  end


  private

  def reset_params
    params.require(:password_reset).permit(:password, :password_confirmation)
  end

  def load_user_using_perishable_token
    @user = User.find_using_perishable_token(params[:id])
    unless @user
      render_error(message: "We're sorry, but we could not locate your account")
    end
  end
end
