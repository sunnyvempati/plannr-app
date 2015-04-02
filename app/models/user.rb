class User < ActiveRecord::Base
  acts_as_authentic  # authlogic

  has_one :profile
  has_many :events
  belongs_to :company

  def deliver_password_reset_instructions!
    reset_perishable_token!
    UserMailer.reset_password_instructions(self).deliver_now
  end
end
