class CompaniesController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def show
    @header = current_user.company.name
  end
end
