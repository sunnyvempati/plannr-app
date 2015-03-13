class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user

  def index
    @events = Event.all
    @header = "Events"
  end

  def new
    @header = "Tell us about your event";
  end

  def create
    @event = Event.create!(event_params)
    render :show
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
    event_params = params.require(:event).permit(:name, :client_name, :start_date, :location, :budget)
    event_params[:start_date] = Date.strptime(event_params[:start_date], "%m/%d/%Y")
    event_params
  end
end
