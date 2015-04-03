class EventsController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  # before_action only: [:create, :update] do
  #   convert_all_dates_to_us_format(%w(start_date end_date))
  # end

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
    start_date = event_params[:start_date]
    end_date = event_params[:end_date]

    converted_start_date = convert_date_to_us_format(start_date)
    converted_end_date = convert_date_to_us_format(end_date)

    ep = event_params

    ep.except!("start_date", "end_date")
    ep.merge!(start_date: converted_start_date, end_date: converted_end_date)

    @event = Event.new(ep)
    render_entity @event
  end

  def update
    # binding.pry
    start_date = event_params[:start_date]
    end_date = event_params[:end_date]

    converted_start_date = convert_date_to_us_format(start_date)
    converted_end_date = convert_date_to_us_format(end_date)

    ep = event_params

    ep.except!("start_date", "end_date")
    ep.merge!(start_date: converted_start_date, end_date: converted_end_date)

    @event.assign_attributes(ep)
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

  # def convert_all_dates_to_us_format(dates)
  #   dates.each { |date|
  #     begin
  #       event_params[date] = convert_date_to_us_format(event_params[date])
  #     rescue ArgumentError => e
  #       render_error({date => e.message})
  #       return
  #     end
  #   }
  # end

end
