class UserSessionsController < ApplicationController
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :authenticate_user, :only => :destroy

  def new
  end

  def create
    @user_session = UserSession.new user_params
    if @user_session.save
      render json: {success: true, redirect_path: return_to_url(root_path)}, status: 200
    else
      render json: errors_hash(@user_session.errors), status: 403
    end
  end

  def destroy
    current_user_session.destroy
    binding.pry
    redirect_to return_to_url(login_path)
  end

  protected

  def user_params
    params.require(:user_session).permit(:email, :password)
  end

  def return_to_url(default_path)
    url = session[:return_to] || default_path
    session[:return_to] = nil
    return url
  end
end
