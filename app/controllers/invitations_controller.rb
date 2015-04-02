class InvitationsController < ApplicationController
  before_action :authenticate_user

  def index
    @invitations = Invitation.all
    render json: @invitations, each_serializer: InvitationSerializer
  end

  def create
    @invitation = Invitation.new(invite_params)
    @invitation.sender_id = current_user.id
    if @invitation.save
      @invitation.deliver_sign_up_instructions
      render json: @invitation
    else
      render_error(@invitation.errors)
    end
  end

  def invite_params
    params.require(:invitation).permit(:email)
  end
end
