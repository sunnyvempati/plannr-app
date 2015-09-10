module Admin
  class ApplicationController < ::ApplicationController
    skip_before_filter :set_company_tenant
    layout 'admin'

    before_action :ensure_admin

    def ensure_admin
      unless current_user && current_user.admin?
        redirect_to '/#/login'
      end
    end
  end

end
