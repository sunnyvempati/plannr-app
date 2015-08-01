class ContactsController < ApplicationController
  include FilterSort
  layout 'main'
  before_action :authenticate_user
  before_action :set_contact,  only: [:show, :edit, :update, :destroy]
  before_action :set_event, only: [:contacts_not_in_event]

  def index
    @contacts = params[:page] ? @filter_sort.find.page(params[:page]) : @filter_sort.find
    respond_to do |format|
      format.html
      format.json { render json: @contacts }
    end
  end

  def show
    render_success @contact
  end

  def new
    @contact = Contact.new
  end

  def edit
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

  def mass_destroy
    render_success Contact.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def contact_params
    params.require(:contact)
          .permit(:name, :email, :category, :phone, :organization, :description, :vendor_id)
          .merge(owner: current_user)
  end

  def model
    Contact
  end
end
