class FeedbackMailer < ApplicationMailer
  default from: 'feedback@yourplannr.com'

  def send_user_feedback(feedback)
    @message = feedback.message
    mail(to: 'support@yourplannr.com', subject: "Feedback from #{feedback.sender.email}")
  end
end
