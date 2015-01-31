class Event < ActiveRecord::Base
	belongs_to :user

	def self.header
		"Events"
	end
end
