class EventVendorsController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    serializer = filter_sort_params && filter_sort_params[:with_event_id] ? EventVendorWithVendorSerializer : EventVendorWithEventSerializer
    @event_vendors = @filter_sort.find
    respond_to do |format|
      format.html
      format.json { render json: @event_vendors, each_serializer: serializer }
    end
  end

  def create
    event_vendor = EventVendor.new event_id: params[:event_id]
    if event_vendor_params[:vendor_id]
      event_vendor.vendor_id = event_vendor_params[:vendor_id]
    else
      event_vendor.vendor_id = Vendor.create!(name: event_vendor_params[:name]).id
    end
    if event_vendor.save
      render json: event_vendor, serializer: EventVendorWithVendorSerializer
    else
      render_error
    end
  end

  def mass_delete
    ids = mass_delete_params[:ids]
    EventVendor.destroy_all(id: ids) if ids
    render_success
  end

  private

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def event_vendor_params
    params.require(:event_vendor).permit(:vendor_id, :name)
  end

  def model
    EventVendor
  end
end
