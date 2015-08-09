class UserSessionsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user, :only => :destroy

  def new
  end

  def create
    @user_session = UserSession.new user_params
    render_entity @user_session
  end

  def destroy
    current_user_session.destroy
    render_success
  end

  protected

  def user_params
    params.require(:user_session).permit(:email, :password)
  end
end
