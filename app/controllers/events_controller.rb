class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  def index
    @events = Event.all
    @header = 'Events'
    respond_to do |format|
      format.html
      format.json { render json: Event.all, each_serializer: EventSelectInputSerializer }
    end
  end

  def show
    if @event
      render :show
    else
      # TOOD: message for user notifying of missing @event and redirect
      redirect_to :action =>"index"
    end
  end

  def new
    @event = Event.new
    @header = 'Tell us about your event';
  end

  def edit
    @header = 'Edit Event'
  end

  def create
    modified_entity_params = event_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(start_date end_date))
    modified_entity_params = add_owner_id_to_entity_params(modified_entity_params, @current_user.id)

    @event = Event.new(modified_entity_params)
    render_entity @event
  end

  def update
    modified_entity_params = event_params
    modified_entity_params = convert_date_params_to_date_type(modified_entity_params, %w(start_date end_date))

    @event.assign_attributes(modified_entity_params)
    render_entity @event
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_event
    @event = Event.find_by_id(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :start_date, :end_date, :description, :location, :client_name, :budget, :notes)
  end
end
