class CompaniesController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def show
    @company = Company.find(params[:id])
    @header = "Invite users to " + @company.name
  end
end
