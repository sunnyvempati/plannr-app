class CompaniesController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def show
  end
end
