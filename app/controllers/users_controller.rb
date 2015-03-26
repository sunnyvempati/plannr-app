class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    # if company exists, return error
    if Company.find_by_lowercase_name(company_params[:name])
      render_error({company: "already exists. Request invite."})
      return
    end

    @user = User.new user_params
    if @user.save
      @user.update_attributes!(company: Company.create(company_params))
      respond_with @user
    else
      render json: errors_hash(@user.errors), status: 403
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def company_params
    params.require(:company).permit(:name)
  end
end
