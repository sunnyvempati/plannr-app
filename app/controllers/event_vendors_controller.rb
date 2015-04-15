class EventVendorsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_params, only: [:create]
  before_action :set_event_vendor, only: [:create, :destroy]

  def create
    @event.vendors << @vendor
    render_entity @event
  end

  def destroy
    @event.vendors.delete(@vendor)
    render_entity @event
  end

  def vendors
    render json: EventVendor.all.where(event_id: params[:event_id]), each_serializer: EventVendorWithVendorSerializer
  end

  def mass_delete
    ids = mass_delete_params[:event_vendor_ids]
    EventContact.delete_all(id: ids) if ids
    render_success
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event_vendor

    @event = Event.find_by_id(params[:event_id])
    if params[:vendor_id] == "-1"

      @vendor = Vendor.create(name: params[:searchText])

    else
      @vendor = Vendor.find_by_id(params[:vendor_id])
    end
  end

  def validate_params
    # vendor_id is present and (string or -1)
    # event_id is string
    # searchText is present

    error_message = ''
    if params[:vendor_id] == "-1"
      if params[:searchText] == nil
        error_message = error_message + 'Missing searchText parameter; '
      end
    end

    if params[:event_id] == nil
      error_message = error_message + 'Missing event_id parameter; '
    end

    if params[:vendor_id] == nil
      error_message = error_message + 'Missing vendor_id parameter; '
    end

    if error_message != ''
      raise error_message
    end

  end

  def mass_delete_params
    params.require(:destroy_opts).permit(event_vendor_ids: [])
  end

end
