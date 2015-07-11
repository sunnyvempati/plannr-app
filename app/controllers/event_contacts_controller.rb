class EventContactsController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    serializer = params[:event_id] ? EventContactWithEventSerializer : EventContactWithContactSerializer
    @event_contacts = @filter_sort.find
    respond_to do |format|
      format.html
      format.json { render json: @event_contacts, each_serializer: serializer }
    end
  end

  def create
    event_contact = EventContact.new event_id: params[:event_id]
    if event_contact_params[:contact_id]
      event_contact.contact_id = event_contact_params[:contact_id]
    else
      event_contact.contact_id = Contact.create!(name: event_contact_params[:name]).id
    end
    if event_contact.save
      render json: event_contact, serializer: EventContactWithContactSerializer
    else
      render_error
    end
  end

  def mass_delete
    ids = mass_delete_params[:ids]
    EventContact.destroy_all(id: ids) if ids
    render_success
  end

  private

  def event_contact_params
    params.require(:event_contact).permit(:contact_id, :name)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    EventContact
  end
end
