class EventsController < ApplicationController
	layout 'dashboard', only: [:index]
  def index
  	render json: current_user.events
  end
end
