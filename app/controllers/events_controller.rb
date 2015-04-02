class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action only: [:create, :update] do
    convert_dates_to_us_format(%w(start_date end_date))
  end

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
    @event = Event.new(event_params)
    render_entity @event
  end

  def update
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

  def convert_dates_to_us_format(dates)
    dates.each { |date|
      begin
        event_params[date] = convert_date_to_us_format(event_params[date])
      rescue ArgumentError => e
        render_error({date => e.message})
        return
      end
    }
  end

end
