class ContactsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,  only: [:show, :edit, :update, :destroy]
  before_action :set_event, only: [:contacts_not_in_event]

  def index
    @header = 'Contacts'
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    respond_to do |format|
      format.html
      format.json { render json: Contact.includes(:vendor).all.order(order) }
    end
  end

  def show
    render_success @contact
  end

  def new
    @contact = Contact.new
    @header = 'Create Contact'
  end

  def edit
    @header = 'Edit Contact'
  end

  def create
    @contact = Contact.new contact_params
    render_entity @contact
  end

  def update
    @contact.assign_attributes(contact_params)
    render_entity @contact
  end

  def search_clients
    search_results = Contact.search_clients(search_params[:text])
    render_success search_results
  end

  def search
    render_success Contact.search(search_params[:text])
  end

  def quick_create
    @contact = Contact.quick_create(quick_create_params[:text])

    render_entity @contact do
      EventContact.create(contact_id: @contact.id, event_id: quick_create_params[:event_id])
    end
  end

  def search_contacts_not_in_event
    render json: Contact.search_not_in(params[:event_id], search_params[:text]), each_serializer: ContactSerializer
  end

  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to contacts_url, notice: 'Contact was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_destroy
    render_success Contact.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def quick_create_params
    params.require(:quick_contact).permit(:event_id, :text)
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def contact_params
    params.require(:contact)
          .permit(:name, :email, :category, :phone, :organization, :description, :vendor_id)
          .merge(owner: current_user)
  end
end
