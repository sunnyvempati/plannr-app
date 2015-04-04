class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :modify_event_params, :only => [:create, :update]

  def index
    @events = Event.all
    @header = "Events"
  end

  def show
    if @event
      render :show
    else
      redirect_to :new
    end
  end

  def new
    @event = Event.new
    @header = "Tell us about your event";
  end

  def edit
    @header = "Edit Event"
  end

  def create
    @event = Event.new(@modified_event_params)
    render_entity @event
  end

  def update
    @event.assign_attributes(@modified_event_params)
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

  def modify_event_params
    # change date params from string to date and stored in global for use in create and update
    @modified_event_params = event_params
    %w(start_date end_date).each do |date_field_name|
      @modified_event_params.except!(date_field_name)
      @modified_event_params.merge!(date_field_name => convert_us_formatted_string_to_date_type(event_params[date_field_name]))
    end
  end

end
