class VendorsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_vendor, only: [:show, :edit, :update, :destroy]


  def index
    @vendors = Vendor.all
    @header = "Vendors"
  end

  def show
    @header = "Vendor"
  end

  def new
    @vendor = Vendor.new
    @header = "Create Vendor"
  end

  def edit
    @header = "Edit Vendor"
  end

  def create
    @vendor = Vendor.new(vendor_params)
    render_entity @vendor
  end

  def update
    @vendor.assign_attributes(vendor_params)
    render_entity @vendor
  end

  def destroy
    @vendor.destroy
    respond_to do |format|
      format.html { redirect_to vendors_url, notice: 'Vendor was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_vendor
    @vendor = Vendor.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def vendor_params
    params.require(:vendor).permit(:name, :description, :deadline)
  end

end
