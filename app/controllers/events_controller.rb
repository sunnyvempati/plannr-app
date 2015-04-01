class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]

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
    begin
      if event_params[:start_date].present?
        event_params[:start_date] = convert_date_to_us_format(event_params[:start_date])
      end
    rescue ArgumentError => e
      render_error({start_date: e.message})
      return
    end

    begin
      if event_params[:end_date].present?
        event_params[:end_date] = convert_date_to_us_format(event_params[:end_date])
      end
    rescue ArgumentError => e
      render_error({end_date: e.message})
      return
    end

    @event = Event.new(event_params)
    render_entity @event
  end

  def update
    begin
      if event_params[:start_date].present?
        event_params[:start_date] = convert_date_to_us_format(event_params[:start_date])
      end
    rescue ArgumentError => e
      render_error({start_date: e.message})
      return
    end

    begin
      if event_params[:end_date].present?
        event_params[:end_date] = convert_date_to_us_format(event_params[:end_date])
      end
    rescue ArgumentError => e
      render_error({end_date: e.message})
      return
    end

    @event.assign_attributes(event_params)
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
