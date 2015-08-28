class UserSessionsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user, :only => :destroy

  def new
  end

  def create
    @user_session = UserSession.new user_params
    # not using helper because of validate flag
    # save is hijacked by authlogic
    if @user_session.save
      render_success @user_session
    else
      render json: errors_hash(@user_session.errors), status: 403
    end
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
