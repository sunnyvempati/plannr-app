class CompaniesController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def show
    @company = current_user.company
    @header = "Invite users to " + @company.name
  end
end
