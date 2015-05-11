class EventContactsController < ApplicationController
  before_action :authenticate_user

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

  def contacts
    render json: EventContact.all.where(event_id: params[:event_id]), each_serializer: EventContactWithContactSerializer
  end

  def mass_delete
    ids = mass_delete_params[:event_contact_ids]
    EventContact.delete_all(id: ids) if ids
    render_success
  end

  private

  def event_contact_params
    params.require(:event_contact).permit(:contact_id, :name)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(event_contact_ids: [])
  end
end
