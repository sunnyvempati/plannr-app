class EventsController < ApplicationController
	layout 'dashboard', only: [:index]
  def index
  	@events = Event.all
  	@header = "Events"
  end
end
