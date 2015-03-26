class ProfilesController < ApplicationController
  def new
    @profile = Profile.new(user: current_user)
  end

  def create
    @profile = Profile.new(profile_params.merge(user: current_user))
    if @profile.save
      respond_with @profile
    else
      render json: errors_hash(@profile.errors), status: 403
    end
  end

  def show
    @profile = Profile.find_by_id(params[:id])
    if @profile
      render :show
    else
      redirect_to :new
    end
  end

  def profile_params
    params.require(:profile).permit(:first_name, :last_name)
  end
end
