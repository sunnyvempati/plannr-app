class EventsController < ApplicationController
  layout 'main', only: [:index]
  before_filter :authenticate_user
  def index
    @events = Event.all
    @header = "Events"
  end
end
