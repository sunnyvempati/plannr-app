class CompaniesController < ApplicationController
  layout 'main'
  def show
    @company = Company.find(params[:id])
    @header = @company.name
  end
end
