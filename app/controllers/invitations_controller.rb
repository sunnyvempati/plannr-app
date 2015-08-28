class InvitationsController < ApplicationController
  before_action :authenticate_user, except: [:get_by_token]
  before_action :check_admin, only: [:create]

  def index
    @invitations = Invitation.active_invites
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

  def get_by_token
    @invitation = Invitation.find_by_token(params[:token])
    if @invitation
      render json: @invitation, serializer: InvitationSerializer
    else
      render json: {}, status: 403
    end
  end

  def invite_params
    params.require(:invitation).permit(:email)
  end
end
