class ApplicationController < ActionController::Base
  respond_to :html, :json
  include ResponseHelpers

  # Event monitoring
  include Hallmonitor::Monitored

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

  def authenticate_user
    unless current_user
      render_error message: 'You must be logged in to access this page'
      return false
    end
  end

  def check_admin
    render_error(message: 'Not an admin') if !current_user.company_admin?
  end
end
