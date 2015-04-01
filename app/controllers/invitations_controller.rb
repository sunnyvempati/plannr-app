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
      render json: @invite
    else
      render_error(@invite.errors)
    end
  end

  def invite_params
    params.require(:invitation).permit(:email, :company_id)
  end
end
