class ContactsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,  only: [:show, :edit, :update, :destroy]

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

  def search
    @contacts = searchMe(params[:searchText], params[:associatedObjectId], params[:associated])

    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @contacts, :searchText =>  params[:searchText]}
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end

  def search_by_name_or_email_like
    @contacts = Contact.name_or_email_like('%' + params[:searchText] + '%')  

    respond_to do |format|
      msg = { :status => "ok", :message => "Success!", :data => @contacts }
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end


  private
  # Use callbacks to share common setup or constraints between actions.
  def set_contact
    @contact = Contact.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contact_params
    params.require(:contact).permit(:name, :email, :contact_type, :phone, :contact_company, :description)
  end

  def searchMe(search, event_id, is_associated)
    like_condition = '%' + search + '%'
    ass_contacts = Event.find_by_id(event_id).contacts
    .name_or_email_like(like_condition)

    if is_associated == nil || is_associated.downcase == 'false'
      Contact.name_or_email_like(like_condition)
      .where.not(id: ass_contacts.map(&:id))      
    else
      Contact.name_or_email_like(like_condition)
      .where(id: ass_contacts.map(&:id))
    end
  end

end
