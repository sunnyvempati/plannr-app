class VendorsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_vendor, only: [:show, :edit, :update, :destroy]
  before_action only: [:create] do 
    add_owner_id_to_entity_params(vendor_params)
  end            

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
    @vendor = Vendor.new(@modified_entity_params_for_create)
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
    params.require(:vendor).permit(:name, :location, :phone, :primary_contact, :owner_id)
  end

  def add_owner_id_to_entity_params(entity_params)
    @modified_entity_params_for_create = entity_params
    @modified_entity_params_for_create.merge!({:owner_id =>  @current_user.id})
    binding.pry
  end

end

