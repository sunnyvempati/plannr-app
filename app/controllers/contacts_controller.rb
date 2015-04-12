class ContactsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,  only: [:show, :edit, :update, :destroy]
  before_action :set_event, only: [:contacts_not_in_event, :search_contacts_not_in_event ]

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
    modified_entity_params = add_owner_id_to_entity_params(contact_params, @current_user.id)

    @contact = Contact.new(modified_entity_params)
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
    render json: Contact.search_other_contacts(search_params), each_serializer: ContactSerializer
  end

  private

  def quick_contact_params
    params.require(:quick_contact).permit(:event_id, :text)
  end

  def search_params
    params.require(:search).permit(:event_id, :text)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_contact
    @contact = Contact.find(params[:id])
  end

  def set_event
    @event = Event.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contact_params
    params.require(:contact).permit(:name, :email, :contact_type, :phone, :contact_company, :description)
  end
end
