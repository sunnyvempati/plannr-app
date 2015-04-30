class UsersController < ApplicationController
  before_action :authenticate_user, :only => [:show, :edit, :update]
  before_action :check_invitation!, :require_no_user, only: [:new, :create]

  # only admins can toggle admin abilities
  before_action :check_admin, only: [:toggle_admin, :index]

  def index
    render json: User.includes(:profile).order("profiles.first_name asc"), each_serializer: CompanyUserSerializer
  end

  def search
    search_results = User.search_with(search_params[:text])
    render json: search_results, each_serializer: CompanyUserSerializer
  end

  def new
    @user = User.new(email: @invitation.email, company: @invitation.company)
  end

  # this endpoint is used if Plannr invited user.
  def create
    # if company exists and Plannr invited user, return error
    if !@invitation.company && Company.find_by_lowercase_name(company_params[:name])
      render_error({company: "already exists. Request invite."})
      return
    end

    @user = User.new user_params
    @user.company = @invitation.company || Company.create(company_params)
    # in case we created it on the above line, set the tenant
    set_current_tenant(@user.company)

    # if company was set, then by default make them non-admin
    @user.company_admin = @invitation.company ? false : true

    render_entity(@user) do
      invite_args = {recipient: @user}
      invite_args.merge!({company: @user.company}) if !@invitation.company
      @invitation.update_attributes!(invite_args)
    end
  end

  def toggle_admin
    user = User.find(params[:id])
    user.update_attribute(:company_admin, !user.company_admin)
    render json: {message: "success", admin: user.company_admin}
  end

  def mass_destroy
    User.destroy(params[:ids])
    render json: {message: "success"}
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def company_params
    params.require(:company).permit(:name)
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def check_invitation!
    @invitation = Invitation.find_by_token(params[:invite_token])
    # if invitation doesn't exist, error
    if !@invitation
      flash[:error] = "Must be invited to sign up for Plannr"
      redirect_to login_path
    end
    # if invitation is used, recipient gets set, which means invitation has expired.
    if @invitation && @invitation.recipient
      flash[:error] = "Invitation has expired or been used already. Request new invitation"
      redirect_to login_path
    end
  end
end
