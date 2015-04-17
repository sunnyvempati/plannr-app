class EventVendorsController < ApplicationController
  before_action :authenticate_user

  def create
    event_vendor = EventVendor.new event_id: params[:event_id]
    event_vendor.vendor_id = event_vendor_params[:vendor_id]
    if event_vendor.save
      render json: event_vendor, serializer: EventVendorWithVendorSerializer
    else
      render_error
    end
  end

  def destroy
    @event.vendors.delete(@vendor)
    render_entity @event
  end

  def vendors_count
    render json: EventVendor.all.where(event_id: params[:event_id]).count
  end

  def vendors
    render json: EventVendor.all.where(event_id: params[:event_id]), each_serializer: EventVendorWithVendorSerializer
  end

  def mass_delete
    ids = mass_delete_params[:event_vendor_ids]
    EventVendor.delete_all(id: ids) if ids
    render_success
  end

  private
  def event_vendor_params
    params.require(:event_vendor).permit(:vendor_id)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(event_vendor_ids: [])
  end

end
