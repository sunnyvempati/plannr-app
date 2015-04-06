class ContactsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,
                only: [:show, :edit, :update, :destroy]
  before_action only: [:create] do 
    add_owner_id_to_entity_params(contact_params)
  end  

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
    binding.pry
    @contact = Contact.new(@modified_entity_params)
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

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_contact
    @contact = Contact.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contact_params
    params.require(:contact).permit(:name, :email, :contact_type, :phone, :contact_company, :description, :owner_id)
  end

  def add_owner_id_to_entity_params(entity_params)
    @modified_entity_params_for_create = entity_params
    @modified_entity_params_for_create.merge!({:owner_id =>  @current_user.id})
  end

end
