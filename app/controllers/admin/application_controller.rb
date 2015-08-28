class Admin::ApplicationController < ApplicationController
  skip_before_filter :set_company_tenant

  before_action :ensure_admin

  def ensure_admin
    unless current_user && current_user.admin?
      return head :unauthorized
    end
  end
end
