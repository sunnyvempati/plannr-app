class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def index
    @events = Event.all
    @header = "Events"
  end

  def new
    @event = Event.new
    @header = "Tell us about your event";
  end

  def create
    begin
      event_params[:start_date] = convert_date(event_params[:start_date])
    rescue ArgumentError => e
      render_error({start_date: e.message})
      return
    end

    @event = Event.new(event_params)
    render_entity @event
  end

  def show
    @event = Event.find_by_id(params[:id])
    if @event
      render :show
    else
      redirect_to :new
    end
  end


  def event_params
    params.require(:event).permit(:name, :client_name, :start_date, :budget, :notes)
  end
end
