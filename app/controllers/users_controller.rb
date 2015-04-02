class UsersController < ApplicationController
  before_filter :authenticate_user, :only => [:show, :edit, :update]
  before_filter :check_invitation!, :require_no_user, only: [:new, :create]

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

    render_entity(@user) do
      @invitation.update_attribute(:expired, true)
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def company_params
    params.require(:company).permit(:name)
  end

  def check_invitation!
    @invitation = Invitation.find_by_token(params[:invite_token])
    # if invitation doesn't exist, error
    if !@invitation
      flash[:error] = "Must be invited to sign up for Plannr"
      redirect_to login_path
    end
    # if invitation is expired
    if @invitation && @invitation.expired
      flash[:error] = "Invitation has expired or been used already. Request new invitation"
      redirect_to login_path
    end

  end
end
