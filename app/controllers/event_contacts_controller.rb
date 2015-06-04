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
    order = sort_params ? "contacts.#{sort_params[:entity]} #{sort_params[:order]}" : 'contacts.name asc'
    contacts = EventContact.contacts(params[:event_id]).order(order)
    render json: contacts,
           each_serializer: EventContactWithContactSerializer
  end

  def events
    order = sort_params ? "contacts.#{sort_params[:entity]} #{sort_params[:order]}" : 'events.name asc'
    events = EventContact.events(params[:contact_id]).order(order)
    render json: events,
           each_serializer: EventContactWithEventSerializer
  end

  def search
    render json: EventContact.search(params[:event_id], search_params[:text]), each_serializer: EventContactWithContactSerializer
  end

  def mass_delete
    ids = mass_delete_params[:ids]
    EventContact.delete_all(id: ids) if ids
    render_success
  end

  private

  def event_contact_params
    params.require(:event_contact).permit(:contact_id, :name)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end
end
