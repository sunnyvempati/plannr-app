class EventsController < ApplicationController
  include FilterSort
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  def index
    @events = @filter_sort.find.page(params[:page])
    render_success @events
  end

  def show
    render_success @event
  end

  def new
    @event = Event.new
  end

  def edit
  end

  def create
    @event = Event.new
    template_event = template_params && template_params[:parent_event_id]
    if template_event
      template = Event.find(template_event)
      @event = template.copy(template_params)
    end
    @event.assign_attributes(event_params)
    render_entity @event do
      # copying from template
      EventContact.find_or_create_by(contact_id: @event.client_id, event_id: @event.id) if @event.client_id
    end
  end

  def update
    @event.assign_attributes event_params
    # need to skip validation on archive update
    # so it doesn't validate if past start_date
    skip_validation = event_params[:status] == 2;
    render_entity @event, skip_validation do
      EventContact.find_or_create_by(contact_id: @event.client_id, event_id: @event.id) if @event.client_id
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_delete
    ids = mass_delete_params[:ids]
    Event.destroy_all(id: ids) if ids
    render_success
  end

  private

  def set_event
    @event = Event.find_by_id(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :start_date, :end_date, :location, :client_id, :budget, :description, :status).merge(owner: current_user)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def template_params
    # event_id: uuid
    # contacts: bool (if they should be copied or not)
    # vendors: bool
    # tasks: bool
    # comments: bool
    t_params = {}
    if params[:template] && !params[:template].empty?
      t_params = params.require(:template).permit(:parent_event_id, :contacts, :vendors, :tasks, :categories, :comments)
    end
    t_params
  end

  def model
    Event
  end
end
