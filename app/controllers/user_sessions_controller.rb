class UserSessionsController < ApplicationController
  def new
  end

  def create
    @user_session = UserSession.new user_params
    if @user_session.save
      redirect_to events_path
    else
      redirect_to new_user_session_path
    end
  end

  def destroy
    current_user_session.destroy
    redirect_to new_user_session_path
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
