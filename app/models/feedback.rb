class Feedback < ActiveRecord::Base
  belongs_to :sender, class_name: "User"

  def deliver!
    FeedbackMailer.send_user_feedback(self).deliver_later
  end
end
