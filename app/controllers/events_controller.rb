class EventsController < ApplicationController
  layout 'main', only: [:index]
  before_action :authenticate_user!
  def index
    @events = Event.all
    @header = "Events"
  end
end
