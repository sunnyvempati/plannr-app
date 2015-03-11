class ProfilesController < ApplicationController
  def new
    @profile = Profile.new(user: current_user)
  end

  def create
    current_user.profile = Profile.create!(profile_params)
    redirect_to root_path
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
