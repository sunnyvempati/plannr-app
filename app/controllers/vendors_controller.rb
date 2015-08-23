class VendorsController < ApplicationController
  include FilterSort
  layout 'main'
  before_action :authenticate_user
  before_action :set_vendor, only: [:show, :edit, :update, :destroy, :contacts]

  def index
    @vendors = params[:page] ? @filter_sort.find.page(params[:page]) : @filter_sort.find
    render_success @vendors
  end

  def show
    render_success @vendor
  end

  def contacts
    render_success @vendor.contacts
  end

  def new
    @vendor = Vendor.new
  end

  def edit
  end

  def create
    @vendor = Vendor.new vendor_params
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

  def mass_destroy
    render_success Vendor.destroy_all(id: mass_destroy_params[:ids])
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_vendor
    @vendor = Vendor.find(params[:id])
  end

  def vendor_params
    params.require(:vendor).permit(:name, :location, :phone, :primary_contact_id, :description).merge(owner: current_user)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Vendor
  end
end
