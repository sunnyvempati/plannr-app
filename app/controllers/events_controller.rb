class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy, :retrieve_contacts_associated_to_this_event, :retrieve_contacts_not_associated_to_this_event, :retrieve_vendors_associated_to_this_event, :retrieve_vendors_not_associated_to_this_event]

  def index
    @events = Event.all
    @header = 'Events'
  end

  def show
    if @event
      # TODO: get all and then separate?  No get associated first (probably smaller),get unassociated when needed.
      # retrieve_contacts_associated_to_this_event
      # retrieve_contacts_not_associated_to_this_event
      render :show
    else
      redirect_to :new
    end
  end

  def new
    @event = Event.new
    @header = 'Tell us about your event';
  end

  def edit
    @header = 'Edit Event'
  end

  def create
    modified_entity_params = event_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(start_date end_date))
    modified_entity_params = add_owner_id_to_entity_params(modified_entity_params, @current_user.id)

    @event = Event.new(modified_entity_params)
    render_entity @event
  end

  def update
    modified_entity_params = event_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(start_date end_date))
    
    @event.assign_attributes(modified_entity_params)
    render_entity @event
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def retrieve_contacts_associated_to_this_event
    @associated_contacts = @event.contacts
    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @associated_contacts}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  def retrieve_contacts_not_associated_to_this_event
    @unassociated_contacts = Contact.joins("LEFT OUTER JOIN event_contacts ec ON ec.contact_id = contacts.id").where("ec.contact_id IS null OR ec.event_id != '" + @event.id + "'").select("contacts.*")
    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @unassociated_contacts}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  def retrieve_vendors_associated_to_this_event
    @associated_vendors = @event.vendors
    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @associated_vendors}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  def retrieve_vendors_not_associated_to_this_event
    @unassociated_vendors = Vendor.joins("LEFT OUTER JOIN event_vendors ec ON ec.vendor_id = vendors.id").where("ec.vendor_id IS null OR ec.event_id != '" + @event.id + "'").select("vendors.*")
    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @unassociated_vendors}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  private
  def set_event
    @event = Event.find_by_id(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :start_date, :end_date, :description, :location, :client_name, :budget, :notes)
  end

  

end
