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
    @vendor = Vendor.new vendor_params
    render_entity @vendor
  end

  def update
    @vendor.assign_attributes(vendor_params)
    render_entity @vendor
  end

  def search_vendors_not_in_event
    render json: Vendor.search_not_in(params[:event_id], search_params[:text])
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

  def search_params
    params.require(:search).permit(:text)
  end

  def vendor_params
    params.require(:vendor).permit(:name, :location, :phone, :primary_contact).merge(owner: current_user)
  end
end

