class PasswordResetsController < ApplicationController
  before_filter :load_user_using_perishable_token, :only => [ :edit, :update ]

  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user
      @user.deliver_password_reset_instructions!
      flash[:notice] = "Instructions to reset your password have been emailed to you"
      render_success({redirect_to: login_path})
    else
      render_error({email: "not found. Try a different one."})
    end
  end

  def edit
  end

  def update
    @user.password = reset_params[:password]
    @user.password_confirmation = reset_params[:password_confirmation]
    if @user.save
      flash[:success] = "Your password was successfully updated"
      render_success({redirect_to: root_path})
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
      flash[:error] = "We're sorry, but we could not locate your account"
      respond_to do |format|
        format.html { redirect_to login_path }
        format.json { render_redirect(login_path) }
      end
    end
  end
end
