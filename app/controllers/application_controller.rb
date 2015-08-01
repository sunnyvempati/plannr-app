class ApplicationController < ActionController::Base
  respond_to :html, :json
  include ResponseHelpers
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user_session, :current_user

  # sets current user as the tenant
  set_current_tenant_through_filter
  before_filter :set_company_tenant
  before_filter :setup_logging_mdc

  def set_company_tenant
    set_current_tenant(current_user.company) if current_user
  end

  def setup_logging_mdc
    Log4r::MDC.put('session', session.id)
    Log4r::MDC.put('user_id', current_user.id) unless current_user.nil?
  end

  private

  def current_user_session
    @current_user_session ||= UserSession.find
  end

  def current_user
    @current_user ||= current_user_session && current_user_session.user
  end

  def require_no_user
    if current_user
      store_location
      flash[:notice] = "You must be logged out to access this page"
      redirect_to root_path
      return false
    end
  end

  def authenticate_user
    unless current_user
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to login_path
      return false
    else
      redirect_to new_profile_path if !current_user.profile
    end
  end

  def store_location
    session[:return_to] = request.original_url
  end

  def check_admin
    render_error(message: 'Not an admin') if !current_user.company_admin?
  end
end
