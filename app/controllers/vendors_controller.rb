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
    modified_entity_params = add_owner_id_to_entity_params(vendor_params, @current_user.id)

    @vendor = Vendor.new(modified_entity_params)
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

  def search
    @vendors = searchMe(params[:searchText], params[:associatedObjectId], params[:associated])

    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @vendors, :searchText =>  params[:searchText]}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  def search_by_name_or_email_like
    @vendors = Vendor.name_like('%' + params[:searchText] + '%')  

    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @vendors }
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_vendor
    @vendor = Vendor.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def vendor_params
    params.require(:vendor).permit(:name, :location, :phone, :primary_contact)
  end

  def searchMe(search, event_id, is_associated)
    like_condition = '%' + search + '%'
    ass_vendors = Event.find_by_id(event_id).vendors
    .name_like(like_condition)

    if is_associated == nil || is_associated.downcase == 'false'
      Vendor.name_like(like_condition)
      .where.not(id: ass_vendors.map(&:id))      
    else
      Vendor.name_like(like_condition)
      .where(id: ass_vendors.map(&:id))
    end
  end

end

