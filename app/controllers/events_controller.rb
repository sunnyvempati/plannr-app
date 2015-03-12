class EventsController < ApplicationController
  layout 'main', only: [:index,:new]
  before_action :authenticate_user!
  def index
    @events = Event.all
    @header = "Events"
  end

  def new
    @header = "Tell us about your event";
  end

  def create
    created_event = Event.create!(event_params)
  end


  def event_params

  end
end
