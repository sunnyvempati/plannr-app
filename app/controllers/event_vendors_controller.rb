class EventVendorsController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    @event_vendors = params[:page] ? @filter_sort.find.page(params[:page]) : @filter_sort.find
    render json: @event_vendors
  end

  # def create
  #   event_vendor = EventVendor.new event_id: params[:event_id]
  #   if event_vendor_params[:vendor_id]
  #     event_vendor.vendor_id = event_vendor_params[:vendor_id]
  #   else
  #     event_vendor.vendor_id = Vendor.create!(name: event_vendor_params[:name]).id
  #   end
  #   if event_vendor.save
  #     render json: event_vendor, serializer: EventVendorWithVendorSerializer
  #   else
  #     render_error
  #   end
  # end

  def create
    @event_vendor = EventVendor.new event_vendor_params
    render_entity @event_vendor
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

  # def event_vendor_params
  #   params.require(:event_vendor).permit(:vendor_id, :name)
  # end

  def event_vendor_params
    params.require(:event_vendor).permit(:vendor_id, :event_id)
  end

  def model
    EventVendor
  end
end
