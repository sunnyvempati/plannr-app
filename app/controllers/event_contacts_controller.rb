class EventContactsController < ApplicationController
  before_action :authenticate_user

  def create
    event_contact = EventContact.new event_contact_params
    if event_contact.save
      render json: event_contact, serializer: EventContactSerializer
    else
      render_error
    end
  end

  def destroy
    event_contact = EventContact.where(event_id: event_contact_params[:event_id],
                                       contact_id: event_contact_params[:contact_id]).first
    render_success event_contact.delete
  end

  def mass_destroy
    event_contacts =   EventContact.where(event_id: mass_destroy_params[:event_id],
                                       contact_id: mass_destroy_params[:contact_ids])

    render_success event_contacts.delete_all
  end

  private

  def event_contact_params
    params.require(:event_contact).permit(:event_id, :contact_id)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(:event_id, contact_ids:[])
  end
end
