class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  def index
    @events = sort_params ? Event.order("#{sort_params[:entity]} #{sort_params[:order]}") : Event.order("name asc")
    @header = 'Events'
    respond_to do |format|
      format.html
      format.json { render json: @events, each_serializer: EventSerializer }
    end
  end

  def show
    if @event
      @header = @event.name
      # fixed header at top of view
      @disable_skrollable_header = true
      render :show
    else
      # TOOD: message for user notifying of missing @event and redirect
      redirect_to :action =>"index"
    end
  end

  def search
    render json: Event.search(search_params[:text]), each_serializer: EventSerializer
  end

  def new
    @event = Event.new
    @header = 'Tell us about your event';
  end

  def edit
    @header = 'Edit Event'
  end

  def create
    @event = Event.new event_params
    render_entity @event do
      EventContact.find_or_create_by(contact_id: @event.client_id, event_id: @event.id)
    end
  end

  def update
    @event.assign_attributes event_params
    render_entity @event do
      EventContact.find_or_create_by(contact_id: @event.client_id, event_id: @event.id)
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
    Event.delete_all(id: ids) if ids
    render_success
  end

  private

  def set_event
    @event = Event.find_by_id(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :start_date, :end_date, :location, :client_id, :budget, :description).merge(owner: current_user)
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
