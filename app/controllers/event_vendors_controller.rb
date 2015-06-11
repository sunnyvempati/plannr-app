class EventVendorsController < ApplicationController
  before_action :authenticate_user

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

  def vendors
    order = sort_params ? "vendors.#{sort_params[:entity]} #{sort_params[:order]}" : 'vendors.name asc'
    vendors = EventVendor.vendors(params[:event_id]).order(order)
    render json: vendors, each_serializer: EventVendorWithVendorSerializer
  end

  def events
    order = sort_params ? "vendors.#{sort_params[:entity]} #{sort_params[:order]}" : 'events.name asc'
    events = EventVendor.events(params[:vendor_id]).order(order)
    render json: events,
           each_serializer: EventVendorWithEventSerializer
  end

  def search
    render json: EventVendor.search(params[:event_id], search_params[:text]), each_serializer: EventVendorWithVendorSerializer
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

  def search_params
    params.require(:search).permit(:text)
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end
end
