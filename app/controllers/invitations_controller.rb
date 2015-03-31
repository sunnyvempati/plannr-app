class InvitationsController < ApplicationController
  before_action :authenticate_user

  def index
    @invitations = Invitation.all
    render json: @invitations, each_serializer: InvitationSerializer
  end

  def create
    @invite = Invitation.new(invite_params)
    @invite.sender_id = current_user.id
    if @invite.save
      UserMailer.user_invitation(@invite, sign_up_url(invite_token: @invite.token)).deliver_now
      render json: @invite
    else
      render_error(@invite.errors)
    end
  end

  def invite_params
    params.require(:invitation).permit(:email, :company_id)
  end
end
