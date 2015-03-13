class UserSessionsController < ApplicationController
  respond_to :html, :json
  def new
  end

  def create
    @user_session = UserSession.new user_params
    if @user_session.save
      respond_with @user_session
    else
      errors = {}
      # just return first error
      @user_session.errors.messages.each {|k,v| errors[k] = v.first}
      render json: errors, status: 403
    end
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
