class VendorsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]


  def index
    @vendors = Vendor.all
    @header = "Vendors"
  end

end
