class FeedbackController < ApplicationController
  def create
    @feedback = Feedback.new(feedback_params)
    render_entity(@feedback) do
      @feedback.deliver!
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:message).merge(sender: current_user)
  end
end
