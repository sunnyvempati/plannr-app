class ContactsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,  only: [:show, :edit, :update, :destroy]
  before_action :set_event, only: [:contacts_not_in_event]

  def index
    @contacts = Contact.all
    @header = "Contacts"
  end

  def show
    @header = "Contact"
  end

  def new
    @contact = Contact.new
    @header = "Create Contact"
  end

  def edit
    @header = "Edit Contact"
  end

  def create
    @contact = Contact.new contact_params
    render_entity @contact
  end

  def update
    @contact.assign_attributes(contact_params)
    render_entity @contact
  end

  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to contacts_url, notice: 'Contact was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def quick_create
    @contact = Contact.quick_create(quick_create_params[:text])

    render_entity @contact do
      EventContact.create(contact_id: @contact.id, event_id: quick_create_params[:event_id])
    end
  end

  def contacts_not_in_event
    render_success @event.other_contacts
  end

  def search_contacts_not_in_event
    render json: Contact.search_other_contacts(event_id: params[:event_id], text: search_params[:text]), each_serializer: ContactSerializer
  end

  private

  def quick_create_params
    params.require(:quick_contact).permit(:event_id, :text)
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def contact_params
    params.require(:contact)
          .permit(:name, :email, :category, :phone, :organization, :description)
          .merge(owner: current_user)
  end
end
