class ProfilesController < ApplicationController
  def new
  end

  def create
    @profile = Profile.new(profile_params)
    @profile.user = current_user
    render_entity @profile
  end

  def show
    @profile = Profile.find_by_id(params[:id])
    binding.pry
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
