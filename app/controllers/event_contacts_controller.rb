class EventContactsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_params, only: [:create]
  before_action :set_event_contact, only: [:create, :destroy]

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
    if params[:contact_id] == "-1"
      if params[:searchText].index(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i) 
        # if email address, use for name and email
        @contact = Contact.create(name: params[:searchText], email:  params[:searchText])       
      else 
        # if not email address, use for just name
        @contact = Contact.create(name: params[:searchText])
      end
    else
      @contact = Contact.find_by_id(params[:contact_id])
    end
  end

  def validate_params
    # contact_id is present and (string or -1)
    # event_id is string
    # searchText is present

    error_message = ''

    if params[:searchText] == nil 
      error_message = error_message + 'Missing searchText parameter; '
    end

    if params[:event_id] == nil 
      error_message = error_message + 'Missing event_id parameter; '
    end

    if params[:contact_id] == nil 
      error_message = error_message + 'Missing contact_id parameter; '
    end

    if error_message != ''
      raise error_message
    end

  end

end