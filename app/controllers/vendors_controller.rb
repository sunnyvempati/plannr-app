class VendorsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_vendor, only: [:show, :edit, :update, :destroy, :contacts]

  def index
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    respond_to do |format|
      format.html
      format.json { render json: Vendor.includes(:primary_contact).all.order(order) }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @vendor }
    end
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

  def search_vendors_not_in_event
    render json: Vendor.search_not_in(params[:event_id], search_params[:text])
  end

  def search
    search_results = Vendor.search(search_params[:text])
    render_success search_results
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

  def search_params
    params.require(:search).permit(:text)
  end

  def vendor_params
    params.require(:vendor).permit(:name, :location, :phone, :primary_contact_id, :description).merge(owner: current_user)
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
