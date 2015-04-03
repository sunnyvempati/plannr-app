class CompaniesController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def show
    @header = "Invite users to " + current_user.company.name
  end
end
