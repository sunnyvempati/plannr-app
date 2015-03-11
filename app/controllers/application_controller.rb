class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # sets current user as the tenant
  set_current_tenant_through_filter
  before_filter :set_user_tenant

  def set_user_tenant
    set_current_tenant(current_user)
  end
end
