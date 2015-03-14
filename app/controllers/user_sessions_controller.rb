class UserSessionsController < ApplicationController
  def new
  end

  def create
    @user_session = UserSession.new user_params
    render_entity(@user_session)
  end

  def destroy
    current_user_session.destroy
    redirect_to new_user_session_path
  end

  protected

  def user_params
    params.require(:user_session).permit(:email, :password)
  end
end
