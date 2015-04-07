class EventContactsController < ApplicationController
  before_action :authenticate_user
  before_action :set_event_contact,
                only: [:create, :destroy]

  def create
    @event.contacts << @contact
    render_entity @event
  end

  def destroy
     @event.contacts.delete(@contact)
    render_entity @event
  end

   private
  # Use callbacks to share common setup or constraints between actions.
  def set_event_contact
    @event = Event.find_by_id(params[:event_id])
    @contact = Contact.find_by_id(params[:contact_id])
  end

end