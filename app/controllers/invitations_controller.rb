class InvitationsController < ApplicationController
  before_action :authenticate_user
  before_action :check_admin, only: [:create, :resend]

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

  def resend
    @invitation = Invitation.find(params[:id])
    if !@invitation
      return render json: {message: "Something went wrong.  Invitation not found."}, status: 500
    end

    if @invitation && @invitation.recipient
      return render json: {message: "already joined"}, status: 500
    end

    @invitation.deliver_sign_up_instructions
    render json: {message: "Resent invitation successfully"}, status: 200
  end

  def invite_params
    params.require(:invitation).permit(:email)
  end

  def check_admin
    render json: {error: "Not an admin"}, status: 500 if !current_user.company_admin?
  end
end
