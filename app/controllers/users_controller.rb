class UsersController < ApplicationController
  include FilterSort
  before_action :authenticate_user, only: [:show, :edit, :update]
  before_action :check_invitation!, only: [:new, :create]

  # only admins can toggle admin abilities
  before_action :check_admin, only: [:toggle_admin]

  def index
    @users = @filter_sort.find.page(params[:page])
    render_success @users
  end

  def show
    render json: User.includes(:profile).find(params[:id])
  end

  def new
    @user = @invitation ? User.new(email: @invitation.email, company: @invitation.company) : User.new
  end

  def create
    @user = User.new user_params
    unless @user.valid?
      render_entity_error(@user)
      return
    end
    if @invitation
      @user.company = @invitation.company
    else
      if Company.find_by_lowercase_name(company_params[:name])
        render_error({ company: 'already exists. Request invite.' })
        return
      end

      @user.company = Company.create(company_params)
      set_current_tenant(@user.company)
      @user.company_admin = true
    end

    render_entity(@user) do
      if @invitation
        invite_args = { recipient: @user }
        invite_args.merge!({ company: @user.company }) unless @invitation.company
        @invitation.update_attributes!(invite_args)
      end
      @user.deliver_verification_instructions!
    end
  end

  def verify
  end

  def toggle_admin
    user = User.find(params[:id])
    user.update_attribute(:company_admin, !user.company_admin)
    render json: {message: "success", admin: user.company_admin}
  end

  def mass_delete
    User.destroy_all(id: mass_delete_params[:ids])
    render_success
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def company_params
    params.require(:company).permit(:name)
  end

  def mass_delete_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def check_invitation!
    @invitation = Invitation.find_by_token(params[:invite_token])
    # if invitation is used, recipient gets set, which means invitation has expired.
    if @invitation && @invitation.recipient
      flash[:error] = "Invitation has expired or been used already. Request new invitation"
      redirect_to login_path
    end
  end

  def model
    User
  end
end
